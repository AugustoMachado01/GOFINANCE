import { TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";
import {
  LoginMessage,
  SignButtonSocialContainer,
  SignButton,
  SvgContainer,
} from "./styles";

interface SignButtonProps extends TouchableOpacityProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SignSocialButton({
  svg: Svg,
  title,
  ...rest
}: SignButtonProps) {
  return (
    <SignButtonSocialContainer>
      <SignButton {...rest}>
        <SvgContainer>
          <Svg />
        </SvgContainer>
        <LoginMessage>{title}</LoginMessage>
      </SignButton>
    </SignButtonSocialContainer>
  );
}
