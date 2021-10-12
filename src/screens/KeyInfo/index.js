import { AccordionList } from "accordion-collapse-react-native";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { SearchBox } from "../../components/Home";
import SwitchToggle from "../../components/SwitchToggle";
import { GetFaqData,QuestioAnswer } from "./action";
import { KeyInfoStyle } from "./styles";
import I18n from '../../localization/language';

let ListKlia = [
  { label: "KLIA", value: "KLIA" },
  { label: "klia2", value: "klia2" },
];

function _head(item) {
  return (
    <KeyInfoStyle.KeyInfoHeaderView>
      <KeyInfoStyle.keyInfoHeaderSub>
        <KeyInfoStyle.KeyInfoLeftImage
          source={require("../../assets/Images/FAQs/info.png")}
        />
        <KeyInfoStyle.KeyInfoHeaderText>
          {item.categoryLabel}
        </KeyInfoStyle.KeyInfoHeaderText>
      </KeyInfoStyle.keyInfoHeaderSub>
      <KeyInfoStyle.keyInfoHeaderSubtwo>
        <KeyInfoStyle.KeyInfoImage
          source={require("../../assets/Images/Expand.png")}
        />
      </KeyInfoStyle.keyInfoHeaderSubtwo>
    </KeyInfoStyle.KeyInfoHeaderView>
  );
}

const keyInfo = (props) => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.KeyInfoReducer.kayData);
  const [accordion, setAccordian] = useState(result.klia1);
  const [searchlist, setSearchList] = useState([]);
  const [input, setInput] = useState("");

  function _body(data) {
    return (
      <FlatList
        data={
          data.faqQuestions && data.faqQuestions.length > 0
            ? data.faqQuestions
            : data
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() =>goToDetails(item)}>
            <KeyInfoStyle.keyInfoSubView>
              <KeyInfoStyle.keyInfoHeaderSub>
                <KeyInfoStyle.KeyInfoSubText>
                  {item.question}
                </KeyInfoStyle.KeyInfoSubText>
              </KeyInfoStyle.keyInfoHeaderSub>
              <KeyInfoStyle.keyInfoHeaderSubtwo>
                <KeyInfoStyle.KeyInfoImage
                  style={{ height: 8, width: 8 }}
                  resizeMode="cover"
                  source={require("../../assets/Images/Gray_Next.png")}
                />
              </KeyInfoStyle.keyInfoHeaderSubtwo>
            </KeyInfoStyle.keyInfoSubView>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `${item.id}`}
        removeClippedSubviews={true}
      />
    );
  }

  function goToDetails(item){
    dispatch(QuestioAnswer(item))
    props.navigation.navigate('KeyInfoDetails')
  } 
  
  useEffect(() => {
    dispatch(GetFaqData());
  }, [dispatch]);

  useEffect(() => {
    if(result)
    setAccordian(
      result.klia1.filter((values) => {
        return values.language == I18n.locale;
      })
    );
  }, [result]);

  const updateInput = async (input) => {
    if (input.nativeEvent.text.length > 0) {
      const filtered = accordion.map((values) => {
        return values.faqQuestions.filter((data) => {
          return data.question.includes(input.nativeEvent.text);
        })[0];
      });
      setInput(input.nativeEvent.text);
      setSearchList(_.reject(filtered, _.isUndefined));
    } else {
      setInput(input.nativeEvent.text);
      setSearchList([]);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F4FAFF", flex: 1 }}>
      <View style={{ height: "30%" }}>
        <ImageBackground
          resizeMode="cover"
          style={{ height: "85%", width: "100%" }}
          source={require("../../assets/Images/KeyInfoMain.png")}
        >
          <KeyInfoStyle.SearchView>
            <SearchBox
              value={input}
              onChangeHandler={(event) => updateInput(event)}
              onPlaceholder={"Ask a Question"}
            />
          </KeyInfoStyle.SearchView>
        </ImageBackground>
      </View>
      <KeyInfoStyle.KeyInfoHeadeView>
        <Header
          navigation={props.navigation}
          leftTitle={"Key"}
          rightTittle={"Info"}
        />
        <SwitchToggle
          list={ListKlia}
          onChange={(value) =>
            value == "KLIA"
              ? setAccordian(
                  result.klia1.filter((values) => {
                    return values.language == I18n.locale;
                  })
                )
              : setAccordian(
                  result.klia2.filter((values) => {
                    return values.language == I18n.locale;
                  })
                )
          }
        />
      </KeyInfoStyle.KeyInfoHeadeView>
      {searchlist.length == 0 ? (
        <AccordionList
          list={accordion}
          header={_head}
          body={_body}
          keyExtractor={(item) => `${item.categoryLabel}`}
        />
      ) : (
        _body(searchlist)
      )}
    </SafeAreaView>
  );
};

export default keyInfo;
