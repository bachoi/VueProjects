<template>    
    <div style="text-align:left">
        <h1>{{title}}</h1>
        <br />
        <router-link to="/new">Add new food item</router-link>
        <br /><br />
        
        <br /><br />
        <div style="width:50%">
            <b-table :data="menu">
                <template slot-scope="props">
                    <b-table-column field="id" label="ID" width="40" numeric>
                        {{ props.row.id }}
                    </b-table-column>
                    <b-table-column field="name" label="Название" width="300">
                        <a href="#" v-on:click="gotoMenuItemEdit(props.row)">{{props.row.name}}</a>
                    </b-table-column>
                    <b-table-column field="description" label="Описание" width="300">
                        {{ props.row.description }}
                    </b-table-column>
                    <b-table-column field="weight" label="Вес, гр." width="150" numeric>
                        {{ props.row.weight }}
                    </b-table-column>
                    <b-table-column field="price" label="Цена, руб." width="150" numeric>
                        {{ props.row.price }}
                    </b-table-column>
                    <b-table-column label="Удалить" width="150" numeric>
                        <b-button value="Удалить" v-on:click="deleteMenuItem(props.row)">Удалить</b-button>
                    </b-table-column>
                </template>
            </b-table>
        </div>
    </div>    
</template>

<script>
    export default
        {
            name: 'MenuList',
            props: ["title"],
            data: function() {
                return {
                    "menu": []
                }
            },

            mounted() {
                axios
                    .get('/menu')
                    .then(response => (this.menu = response.data))
                    .catch(error => console.log(error));
            },

            methods: {
                gotoMenuItemEdit: function (menuItem) {
                    this.$router.push(`/menulist/${menuItem.id}/edit`);
                },

                deleteMenuItem: function (menuItem) {
                    this.$buefy.dialog.confirm({
                        message: `Удалить данное блюдо \"${menuItem.name}\"из списка?`,
                        onConfirm: () => {
                            axios
                                .delete('/menu/' + menuItem.id)
                                .then(this.menu = this.menu.filter(function (item) { return item.id !== menuItem.id }))
                                .catch(error => console.log(error))
                        }
                    })
                }
            }
        }
</script>