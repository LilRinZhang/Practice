import React, { createContext, ReactNode, useEffect, useState } from 'react';

// ユーザー情報初期値
let userInfoDefault = {
    id: 0,
    account: "",
    name: "",
    email: "",
    loginTime: 0
}

/**
 * ユーザーコンテクストの内容：
 * 
 * isLogined:ログイン状態判定
 * userInfo:ユーザー基本情報
 * onLogin:ログイン処理
 * onLogout:ログアウト処理
 */
const UserContext = createContext({
    isLogined: false,
    userInfo: userInfoDefault,
    onLogin: (userId: number, account: string, name: string, email: string, loginTime: number) => { },
    onLogout: () => { }
});

export function UserContextProvider({ children }: {
    children?: ReactNode;
}) {
    const [user, setUser] = useState(getDefaultUserInfo())
    const [isLogin, setIsLogin] = useState(false)

    // ログイン済みチェック
    useEffect(() => {
        if (user?.id > 0) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [user]);

    const loginHandle = (userId: number, account: string, name: string, email: string, loginTime: number) => {
        let userInfo = {
            id: userId,
            account: account,
            name: name,
            email: email,
            loginTime: loginTime

        }
        setUser(userInfo)
        setUserInfoToLocalStorage(userInfo)
    }

    const logoutHandle = () => {
        console.log("ログアウト")
        setUser(userInfoDefault)
        window.localStorage.removeItem("userInfo")
    }

    const useContextValue = {
        isLogined: isLogin,
        userInfo: user,
        onLogin: loginHandle,
        onLogout: logoutHandle
    }

    return (
        <UserContext.Provider value={useContextValue}>
            {children}
        </UserContext.Provider>
    )
}

/**
 * デフォルトのUserInfoを取得
 * ローカルストレージから取得できた場合はその値をパース
 * 取得できない場合は空の情報を返す
 * ログイン有効時間：10分
 */
function getDefaultUserInfo() {
    const defaultUserInfo = window.localStorage.getItem("userInfo");
    let now = new Date().getTime()
    if (defaultUserInfo) {
        let userInfo = JSON.parse(defaultUserInfo)
        let limitedTime = userInfo.loginTime + 10 * 60 * 1000
        if (now >= limitedTime) {
            window.localStorage.removeItem("userInfo")
            return userInfoDefault
        } else {
            return userInfo;
        }
    } else {
        return userInfoDefault;
    }
}

/**
 * ユーザー認証情報をローカルストレージに追加
 * @param userInfo
 */
function setUserInfoToLocalStorage(userInfo: any) {
    const userInfoStringfy = JSON.stringify(userInfo);
    window.localStorage.setItem("userInfo", userInfoStringfy);
}

export default UserContext