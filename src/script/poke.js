export default class cards {
    constructor() {
        this.url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
    }

    offsetChange() {
        const count = +this.url.substring(50);
        this.url = this.url.replace(`offset=${count}`, `offset=${count + 10}`);
    }

    async getData() {
        try {
            const response = await fetch(this.url);
            const dataJson = (await response.json()).results;
            for (let i = 0; i < dataJson.length; i++) {
                const el = dataJson[i];
                const imgUrl = await this.getImg(el);
                dataJson[i].img = imgUrl;
            }
            this.data = dataJson;
        } catch (e){
            console.error(e);
        }
    }

    async getImg(data) {
        try {
            const resp = await fetch(data.url);
            const pokeInfo = await resp.json();
            return pokeInfo.sprites.other["official-artwork"].front_default;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}
