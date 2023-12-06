// 共通的なデータの設定

const today = new Date()


const constant = {
    // API
    Api: {
        customer: "http://localhost:8080/api/customer",
        account: "http://localhost:8080/api/account"
    },

    // 日付
    Date: {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate()
    },

    // 顧客テーブルコラム項目
    customerColums: [
        {
            name: "CustomerId",
            selector: (row: any) => row.id,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row: any) => row.name,
            sortable: true,
        },
        {
            name: "CustomerPhoneNumber",
            selector: (row: any) => row.phone,
            sortable: true,
        },
        {
            name: "CustomerEmail",
            selector: (row: any) => row.email,
            sortable: true,
        },
    ]
}



export default constant;