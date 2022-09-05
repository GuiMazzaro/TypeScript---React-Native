import { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

import { 
    Conteiner,
    Titulo,
    SubTitulo,
    Campo,
    Botao,
    AdicaoCompetencia,
    SemCompetencias,
    Lista,
    Niveis,
    Icone
} from './estilo'

import { Conhecimento } from '../../componentes/Conhecimento'


// A interface define um tipo
interface tipoCompetencia {
    codigo: string
    descCompetencia: string
    nivel: string
}

// Lista de opções para o RadioForm e para o Picker 
var niveis = [
    {label: 'Básico', value: 'Básico' },
    {label: 'Intermediário', value: 'Intermediário' },
    {label: 'Avançado', value: 'Avançado' }
]


export function Inicial(){

    const [descricao, setDescricao] = useState('')
    const [nivel, setNivel] = useState('Básico')
    // Declara o state competencias como um array do tipo tipoCompetencia
    const [competencias, setCompetencias] = useState<tipoCompetencia[]>([])

    // Define o nome da coleção que será manipulada no Async Storage
    const colecao = '@competencias:'


    // --> Adicionar
    async function adicionarCompetencia(){

         // Cria um objeto no formato do tipoCompetencia para ser inserido no array
        const novaCompetencia: tipoCompetencia = {
            // Código gerado pelo Universally Unique IDentifier (UUID)
            codigo: String(uuidv4()),
            descCompetencia: descricao,
            nivel: nivel
        }
       
        // Verifica se o objeto novaCompetencia já foi inserido no array
        // O find retorna o objeto (quando encontra) ou undefined
        // O typeof identifica o undefined
        if(typeof(competencias.find(
            competenciaArmazenada => competenciaArmazenada.descCompetencia == novaCompetencia.descCompetencia
            )) !== "undefined"){
            // Apresenta uma mensagem e finaliza a função adicionarCompetencia
            return Alert.alert('Duplicidade', 'A competência já foi adicionada!')
        }

        try {       
            // Lê os dados da coleção (como uma string)
            let competenciasArmazenadas = await AsyncStorage.getItem( colecao )
            // Verifica se a coleção n]ao está vazia e converte a coleção de string para JSON
            let competenciasAtuais = competenciasArmazenadas ? JSON.parse(competenciasArmazenadas) : []
            // Considera os dados (objetos competencias) já armazenados e acrescenta a novaCompetencia
            let competenciasAtualizadas = [...competenciasAtuais, novaCompetencia]
            // Salva a coleção atualizada no Async Storage
            await AsyncStorage.setItem(colecao, JSON.stringify(competenciasAtualizadas))
            // Limpa o input
            setDescricao('')
            // Executa a função carregarDados 
            // (Atualiza o State competencias, consequentemente, atualiza a lista de competencias)
            carregarDados()

        } catch (error) {
            // Caso ocorra um erro, mostra dos detalhes em console e apresenta uma mensagem 
            console.log(error)
            Alert.alert('Não foi possivel concluir a gravação!')
        }
    }
    

    // --> Excluir
    // Recebe um objeto competencia por parâmetro
    function excluir(competenciaExclusao: tipoCompetencia){

        try { 
            // Solicita confirmação de exclusão
            Alert.alert('Remover', `Excluir a competência ${competenciaExclusao.descCompetencia}?`, [
                {
                    text: 'Sim',
                    onPress: async () => {
                        // Lê os dados da coleção (como uma string)
                        let competenciasArmazenadas = await AsyncStorage.getItem( colecao )
                        // Verifica se a coleção n]ao está vazia e converte a coleção de string para JSON
                        let competenciasAtuais : tipoCompetencia[] = competenciasArmazenadas ? JSON.parse(competenciasArmazenadas) : []
                        // Gera um novo Array ignorando a competencia a ser "excluída"
                        let competenciasAtualizadas = competenciasAtuais.filter( competencia => competencia.codigo !== competenciaExclusao.codigo)
                        // Salva a coleção atualizada no Async Storage
                        await AsyncStorage.setItem(colecao, JSON.stringify(competenciasAtualizadas))
                        // Executa a função carregarDados 
                        // (Atualiza o State competencias, consequentemente, atualiza a lista de competencias)
                        carregarDados()
                    }
                },
                {
                    text: 'Não'
                }
            ])
            
        }
        catch(error) {
            // Caso ocorra um erro, mostra dos detalhes em console e apresenta uma mensagem 
            console.log(error)
            Alert.alert('Não foi possivel concluir a exclusão!')
        }
    }


    // --> Carregadar dados
    async function carregarDados() {
        // Lê os dados da coleção (como uma string)
        const competenciasArmazenadas = await AsyncStorage.getItem( colecao )
        // Verifica se a coleção n]ao está vazia e converte a coleção de string para JSON
        const competenciasAtuais = competenciasArmazenadas ? JSON.parse(competenciasArmazenadas) : []
        // Atualiza o State competencias, consequentemente, atualiza a lista de competencias
        setCompetencias(competenciasAtuais)
        // Apresenta dos dados armazenados no Async Storage para conferência
        console.log(competenciasAtuais)
    }        


    // Hook que é executado a cada carregamento do app
    useEffect( () => {    

        // Executa a função carregarDados 
        // (Atualiza o State competencias, consequentemente, atualiza a lista de competencias)        
        carregarDados()
        
        // Função que "limpa" o Async Storage quando conveniente
        async function excluiDados() {
            await AsyncStorage.clear()
        }        
        //excluiDados()
    },[] )


    return(
        <Conteiner>
            <Titulo>Competências</Titulo>
            <SubTitulo>Seus conhecimentos</SubTitulo>

            <Campo 
                onChangeText={setDescricao}
                value={descricao}
            />

            <AdicaoCompetencia>

                <Niveis
                    selectedValue={nivel}
                    onValueChange={(opcao) => setNivel(opcao)}
                    mode={'dropdown'}
                    
                    style={{ 
                        flex: 1, 
                        backgroundColor: '#034780',
                        color: '#fff',
                        fontSize: 16,
                        marginRight: 12
                    }}
                >
                   {
                    niveis.map( opcao => (
                        <Niveis.Item key={opcao.value} label={opcao.label} value={opcao.value} />
                    ))
                   } 
                </Niveis>

                <Botao onPress={adicionarCompetencia}>
                    <Icone name="done"/>
                </Botao>

            </AdicaoCompetencia>

            {/* 
                <NiveisRadio
                    radio_props={niveis}
                    initial={0}              
                    onPress={ (value) => { setNivel(value) } }
                />
            */}

            <Lista 
                // Fonte dos dados da lista (array competencias)
                data={competencias}
                // Atributo codigo do tipoCompetencia como chave da lista
                keyExtractor={item => item.codigo}
                // Cada item da lista (um competência armazenada em competencias)
                renderItem={ ( { item } ) => (
                    <Conhecimento 
                        propsDescricao={item.descCompetencia}
                        propsNivel={item.nivel}
                        // Para passar uma função como parâmetro (props)
                        // tem que estar em forma de Arrow Function
                        propsExcluir={ () => excluir(item) }
                    />
                )}
                // Tira a barra de rolagem da lista
                showsVerticalScrollIndicator={false}
                // Apresenta uma mensagem (ou executa qualque outra ação)
                // quando o array estiver vazio 
                ListEmptyComponent={() => (
                  <SemCompetencias>Nenhuma competência armazenada.</SemCompetencias>
                )}
            />

        </Conteiner>
    )
}
