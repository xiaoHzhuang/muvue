const state={
    count:1
}

const getters={
    desc(state){
        if(state.count<50){
            return '吃饭';
        }else if(state.count<100){
            return '睡觉';
        }else{
            return '打游戏';
        }
    }
}

const mutations={
    increment(state,n){
        state.count+=n;
    },
    decrement(state){
        state.count--;
    }
}

const actions={
    add(context){
        context.commit('increment',10)
    },
    decrement({commit,state}){
        commit('decrement');
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}