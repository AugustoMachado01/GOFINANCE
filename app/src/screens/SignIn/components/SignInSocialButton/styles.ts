import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const SignButtonSocialContainer = styled.View`
  margin-bottom: ${RFValue(16)}px;

  border-radius: 5px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.shape};
`;
export const SignButton = styled(TouchableOpacity)`
  height: ${RFValue(56)}px;
  flex-direction: row;
  align-items: center;
`;
export const SvgContainer = styled.View`
  align-items: center;
  justify-content: center;

  height: ${RFValue(56)}px;
  width: ${RFValue(56)}px;

  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.colors.background};
  border-style: solid;
`;
export const LoginMessage = styled.Text`
  font-size: ${RFValue(14)}px;
  flex: 1;
  text-align: center;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.medium};
`;
