import React, { PureComponent } from "react";
import { BackTitleHeader } from "../../components/Common";
import { HeaderContainer, TimeLeft, Timer, TimerCon, TimerText } from "../../screens/MyPlan/style";

export function Header({navigation,title}) {
  return (
    <HeaderContainer>
      <BackTitleHeader navigation={navigation} title={title} />
      <TimerCon>
        <Timer>
          <TimerText>01 : 03</TimerText>
        </Timer>
        <TimeLeft>Time left to Flight</TimeLeft>
      </TimerCon>
    </HeaderContainer>
  );
}
