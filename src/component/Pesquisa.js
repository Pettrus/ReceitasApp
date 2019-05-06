import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';

export default class Pesquisa extends Component {
    state = {
        pesquisa: "",
        timeout: 0
    }

    atualizarPesquisa = pesquisa => {
        if(this.state.timeout)
            clearTimeout(this.state.timeout);
        
        this.setState({
            pesquisa,
            timeout: setTimeout(() => {
                this.pesquisar()
            }, 1000)
        });
    }

    pesquisar = () => {
        if(this.state.pesquisa != null && this.state.pesquisa.length > 0)
            this.props.pesquisar(this.state.pesquisa);
    }
    
    render() {
        return (
            <SearchBar
                placeholder="Pesquisar"
                onChangeText={this.atualizarPesquisa}
                onClear={() => this.props.limpar()}
                showLoading={this.props.carregando}
                value={this.state.pesquisa}
            />
        )
    }
}