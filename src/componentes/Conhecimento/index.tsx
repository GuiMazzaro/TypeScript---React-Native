import { TouchableOpacityProps } from "react-native";

import { 
  Conteiner,
  Descricao,
  Botao,
  Icone 
} from "./estilo";

// Criação do componentes Conhecimento recebendo dois valores e uma função por props
export function Conhecimento({ propsDescricao, propsNivel, propsExcluir }) {
  return (
    <Conteiner>

      <Descricao>{`${propsDescricao}\n${propsNivel}`}</Descricao>

      <Botao onPress={propsExcluir}>
          <Icone name="delete"/>
      </Botao>      

    </Conteiner>
  )
}
