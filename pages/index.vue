<template>
    <div>
        <h1>チャットする人を選んでください</h1>
        <ul v-for="n in Object.keys(usersList)" :key='n.cont'>
            <Nuxt-link :to="`${usersList[n].id}`">
                <div class='names' v-if="login != usersList[n].id">
                    {{ usersList[n].name }}
                </div>
            </Nuxt-link>
        </ul>
    </div>
    
</template>

<style lang="scss">
    .names {
        padding: 10px 12px;
    }

    h1 {
        padding: 10px 10px;
    }

    input {
        margin-left: 10px;
    }
</style>

<script>
export default {
    computed: {
        usersList() {
            return this.$store.state.users.usersList
        },
        login() {
            return this.$store.state.login.loginUser
        }
    }
}
</script>