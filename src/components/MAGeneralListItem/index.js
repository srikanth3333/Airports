import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MAGeneralListItemStyles } from './styles';

const MAGeneralListItem = ({ item, onPressHandler }) => {

  return (
    <MAGeneralListItemStyles.MainContainer>
      <MAGeneralListItemStyles.PresssableComp
        onPress={onPressHandler}
      >
        <MAGeneralListItemStyles.IconContainer>
        <MAGeneralListItemStyles.IconImgView
          resizeMode={"center"}
          source={item.icon}
        />
        </MAGeneralListItemStyles.IconContainer>
        <MAGeneralListItemStyles.TxtLbl>
          {item.title}
        </MAGeneralListItemStyles.TxtLbl>
      </MAGeneralListItemStyles.PresssableComp>
    </MAGeneralListItemStyles.MainContainer>
  );
};


export default MAGeneralListItem;
