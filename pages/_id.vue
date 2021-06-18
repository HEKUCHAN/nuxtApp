<template>
    <div>
        <h1>
            ここは '<span style='color: red;'>{{ usersList["user" + $route.params.id].name }}</span>' とのチャットです
        </h1>
        <div class="sendArea">
            <input type="text" name="send" id="send"
                @keypress.prevent.enter.exact="enable_submit"
                @keyup.prevent.enter.exact="sendMsg"
            >
            <input type="submit" value="送信"
                @click="sendBtn"
            >
        </div>
        <Nuxt-link to="/">
            <span class="home">HOMEに戻る</span>
        </Nuxt-link>
        <div v-for="msg in chatList" :key="msg.cont">
            <div class='msg' v-if="(msg.to == $route.params.id && msg.sendby == login) || (msg.to == login && msg.sendby == $route.params.id )">
                <b>{{ usersList["user" + String(msg.sendby)].name }}</b> : {{ msg.content }}
            </div>
        </div>
    </div>
</template>

<style lang='scss'>
.home {
    margin: 20px 20px;
}

.sendArea input {
    border: 1px solid black;
}

h1 {
    padding: 10px 10px;
}

.msg {
    padding: 5px 5px;
}
</style>

<script>
export default {
    methods: {
        enable_submit() {
            this.can_submit_search = true;
        },
        sendMsg(e) {
            var input = document.getElementById('send');
            var id = this.$store.state.login.loginUser;
            if (!this.can_submit_search) return;
            if ((input.value).replace(" ","").replace("　","") == "") return;

            this.can_submit_search = false;
            this.$store.commit("chat/send", [this.$nuxt.$route.params.id, id, input.value])
            
            input.value = ""
        },
        sendBtn(e) {
            var input = document.getElementById('send');
            var id = this.$store.state.login.loginUser;
            if ((input.value).replace(" ","").replace("　","") == "") return;

            this.can_submit_search = false;
            this.$store.commit("chat/send", [this.$nuxt.$route.params.id, id, input.value])
            
            input.value = ""
        }
    },
    validate({ params,store }) {
        return (
                [...Array(
                        (Object.keys(store.state.users.usersList)
                    ).length).keys()].map(i => ++i)
                ).includes(Number(params.id)) && params.id != store.state.login.loginUser;
    },
    computed: {
        chatList() {
            return this.$store.state.chat.chatHistory
        },
        usersList() {
            return this.$store.state.users.usersList
        },
        login() {
            return this.$store.state.login.loginUser
        }
    }
}
</script>