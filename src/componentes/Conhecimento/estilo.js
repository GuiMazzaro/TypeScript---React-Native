import styled from 'styled-components'
import { MaterialIcons } from '@expo/vector-icons'

// Estilos Conhecimento

export const Conteiner = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;   
    border-radius: 5px;
    margin-bottom: 10px;
`

export const Descricao = styled.Text`
    flex: 1;
    background-color: #262626;
    color: #F5F3F4;
    height: 75px;
    padding: 12px;
    font-size: 18px;
    border-radius: 5px;
    margin-right: 12px;
`

export const Botao = styled.TouchableOpacity`
    background-color: #7a0213;
    width: 56px;
    height: 75px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`

export const BotaoTexto = styled.Text`
    color: #F5F3F4;
    font-weight: bold;
    font-size: 32px;
`

export const Icone = styled(MaterialIcons)`
  color: #F5F3F4;
  font-weight: bold;
  font-size: 28px;
`