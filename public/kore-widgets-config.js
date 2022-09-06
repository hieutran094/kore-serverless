;(function (KoreSDK) {
    var KoreSDK = KoreSDK || {}

    var botOptionsWiz = {}
    botOptionsWiz.logLevel = 'debug'
    botOptionsWiz.koreAPIUrl = 'https://bots.kore.ai'

    botOptionsWiz.JWTUrl = '$API_URL/api/v1/token'
    botOptionsWiz.userIdentity = uuidv4() // Provide users email id here
    botOptionsWiz.botInfo = {
        name: 'Travel Assistant',
        _id: 'st-9dff1dc3-25f1-59ad-a4e9-4ee1722ce452'
    } // bot name is case sensitive
    botOptionsWiz.clientId = 'cs-5697e30e-48cc-55f0-b518-e6b8c692ce12'
    // botOptionsWiz.clientSecret = 'PLEASE_ENTER_CLIENT_SECRET'

    var widgetsConfig = {
        botOptions: botOptionsWiz
    }

    KoreSDK.widgetsConfig = widgetsConfig
})(window.KoreSDK)
