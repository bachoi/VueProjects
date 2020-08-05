<template>
    <div>
        <h1>Редактирование блюда</h1>

        <div style="width:50%; text-align:left; margin:0 auto">
            <b-field label="Название">
                <b-input v-model="menuItem.name"
                         ref="name">
                </b-input>
            </b-field>

            <b-field label="Описание">
                <b-input v-model="menuItem.description"
                         ref="description">
                </b-input>
            </b-field>

            <b-field label="Вес, гр.">
                <b-input type="number"
                         min="0"
                         max="100000"
                         v-model.number="menuItem.weight"
                         ref="weight">
                </b-input>
            </b-field>

            <b-field label="Цена, руб.">
                <b-input type="number"
                         min="0"
                         max="100000"
                         v-model.number="menuItem.price"
                         ref="price">
                </b-input>
            </b-field>

        </div>
        <br /><br />
        <div class="buttons" style="width: 50%; margin:0 auto">
            <div style="margin:0 auto">
                <b-button type="is-primary" @click="save()">Сохранить</b-button>
                <router-link to="/MenuList">
                    <b-button>Отмена</b-button>
                </router-link>
            </div>
        </div>
    </div>
</template>



<script>

    export default {
        data: function () {
            return {
                menuItem: {
                    name: "",
                    description: "",
                    weight: null,
                    price: null
                }
            }
        },

        mounted() {
            if (this.$route.params.id) {            
                    axios.get("/menu/" + this.$route.params.id)
                        .then(response => (this.menuItem = response.data))
                        .catch(error => console.log(error));
            }
        },

        methods: {
            save: function () {
                if (!this.$refs.name) {
                    window.alert("Введите название блюда!");
                    return;
                }

                if (!this.$refs.weight) {
                    window.alert("Введите вес блюда!");
                    return;
                }

                if (!this.$refs.price) {
                    window.alert("Введите стоимость блюда!");
                    return;
                }

                
                if (this.menuItem.id) {
                    axios.patch("/menu/" + this.$route.params.id, this.menuItem)
                        .then((response) => { this.menuItem = response.data; this.$router.push("/MenuList"); })
                        .catch(error => (console.log(error)));
                }
                else {
                    this.menuItem.id = 0;
                    axios.post("/menu", this.menuItem)
                        .then((response) => { this.menuItem = response.data; this.$router.push("/MenuList"); })
                        .catch(error => (console.log(error)));
                }
                
            }
        }
    }
</script>