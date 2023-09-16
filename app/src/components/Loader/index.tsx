import {ActivityIndicator} from 'react-native'
import { useTheme } from 'styled-components'
import { LoaderContainer } from './styles'

export function Loader(){
    const {colors} = useTheme()
    return(

        <LoaderContainer>
            <ActivityIndicator color={colors.primary} size={'large'}/>
        </LoaderContainer>
    )
}