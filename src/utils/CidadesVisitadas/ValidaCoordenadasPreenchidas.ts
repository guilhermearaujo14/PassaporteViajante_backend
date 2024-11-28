
export function ValidaCoordendasPreenchidas(lat: string, long: string){
    if(lat == '' || long == ''){
        return {isSucesso: false, message: 'Ops... Deve ser enviado latitude e longitude para realidar a pesquisa!'}
    }
    return { isSucesso: true, message: ''}
}