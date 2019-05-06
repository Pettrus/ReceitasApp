import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Linking, Text } from 'react-native';
import Pesquisa from '../component/Pesquisa';
import { pesquisarAPI } from '../service/Api';
import { Card, Button, Icon } from 'react-native-elements';
import InAppBrowser from 'react-native-inappbrowser-reborn'

export default class App extends Component {
    state = {
        receitas: [],
        carregando: false
    }

    pesquisar = async (query) => {
        try {
            this.setState({ carregando: true });

            const receitas = await pesquisarAPI(query);
            this.setState({ receitas: receitas.recipes });
        } catch (e) {
            console.log(e);
        } finally {
            this.setState({ carregando: false });
        }
    }

    limpar = async () => {
        this.setState({ receitas: [] });
    }

    abrirLink = async (url) => {
        try {
            if (await InAppBrowser.isAvailable()) {
                await InAppBrowser.open(url, {
                    // iOS Properties
                    dismissButtonStyle: 'cancel',
                    preferredBarTintColor: 'gray',
                    preferredControlTintColor: 'white',
                    readerMode: false,
                    // Android Properties
                    showTitle: true,
                    toolbarColor: '#6200EE',
                    secondaryToolbarColor: 'black',
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: false,
                    animations: {
                        startEnter: 'slide_in_right',
                        startExit: 'slide_out_left',
                        endEnter: 'slide_in_left',
                        endExit: 'slide_out_right'
                    },
                })
            }
            else Linking.openURL(url)
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Pesquisa pesquisar={this.pesquisar} limpar={this.limpar} 
                    carregando={this.state.carregando} />

                {this.state.receitas.length < 1 &&
                    <View style={styles.vazio}>
                        <Icon name="search" size={45}></Icon>
                        <Text style={styles.textoVazio}>
                            Comece fazendo uma pesquisa
                        </Text>
                    </View>
                }

                <ScrollView>
                    {this.state.receitas.map((receita, i) => (
                        <Card key={i} title={receita.title} image={{ uri: receita.image_url }}>
                            <Text>
                                Creator: {receita.publisher}
                            </Text>

                            <Button
                                type="outline"
                                style={styles.botaoAcessar}
                                backgroundColor='#1F89DC'
                                title="Acessar"
                                onPress={() => this.abrirLink(receita.source_url)}
                                raised
                            />
                        </Card>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    vazio: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoVazio: {
        fontSize: 20,
    },
    botaoAcessar: {
        marginTop: 5
    }
});