import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";

export const SignInContainer = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: flex-end;
  padding-top: ${getStatusBarHeight()}px;
  height: 70%;
  background-color: ${({ theme }) => theme.colors.primary};
  padding-bottom: ${RFValue(67)}px;
`;

export const Label = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Title = styled.Text`
  margin-top: ${RFValue(40)}px;
  text-align: center;

  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const LoginAdvise = styled.Text`
  margin-top: ${RFValue(70)}px;

  text-align: center;
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Footer = styled.View`
  height: 30%;
  background-color: ${({ theme }) => theme.colors.secondary};
`;
export const LoginWays = styled.View`
  margin-top: ${RFValue(-26)}px;
  padding: 0 ${RFValue(32)}px;
`;

export const LoginButton = styled.TouchableOpacity`
  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  padding: ${RFValue(16)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const LoginMessage = styled.Text`
  font-size: ${RFValue(14)}px;

  margin-left: 78px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.medium};
`;
