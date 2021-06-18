export const state = () => ({
    chatHistory: [
        { 
            to: 2,
            sendby: 1,
            content: "おはようございます！"
        },
        {
            to: 1,
            sendby: 2,
            content: "おはようございます！"
        },
        {
            to: 1,
            sendby: 3,
            content: "報告がございます"
        }
    ]
})

export const mutations = {
    send (state, t) {;
        state.chatHistory.unshift({
            to: t[0],
            sendby: t[1],
            content: t[2]
        })
    }
}