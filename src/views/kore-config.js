;(function (KoreSDK) {
    var KoreSDK = KoreSDK || {}

    var botOptions = {}
    botOptions.logLevel = 'debug'
    botOptions.koreAPIUrl = 'https://bots.kore.ai/api/'
    botOptions.koreSpeechAPIUrl = '' //deprecated
    //botOptions.bearer = "bearer xyz-------------------";
    //botOptions.ttsSocketUrl = '';//deprecated
    botOptions.koreAnonymousFn = koreAnonymousFn
    botOptions.recorderWorkerPath = '../libs/recorderWorker.js'

    botOptions.JWTUrl =
        'http://localhost:8080/api/v1/token'
    botOptions.userIdentity = uuidv4() // Provide users email id here
    botOptions.botInfo = {
        name: 'Travel Assistant',
        _id: 'st-9dff1dc3-25f1-59ad-a4e9-4ee1722ce452'
    } // bot name is case sensitive

    /* 
    Important Note: These keys are provided here for quick demos to generate JWT token at client side but not for Production environment.
    Refer below document for JWT token generation at server side. Client Id and Client secret should maintained at server end.
    https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/
    **/
    botOptions.clientId = 'cs-5697e30e-48cc-55f0-b518-e6b8c692ce12'
    botOptions.brandingAPIUrl =
        botOptions.koreAPIUrl +
        'websdkthemes/' +
        botOptions.botInfo._id +
        '/activetheme'
    botOptions.enableThemes = true
    // for webhook based communication use following option
    // botOptions.webhookConfig={
    //     enable:true,
    //     webhookURL:'PLEASE_PROVIDE_WEBHOOK_URL',
    //     useSDKChannelResponses: false, //Set it to true if you would like to use the responses defined for Web/Mobile SDK Channel
    //     apiVersion:2 //webhookURL will be converted to v2 by default. To use v1(not recommended) webhookURL change it to 1
    // }

    // To modify the web socket url use the following option
    // botOptions.reWriteSocketURL = {
    //     protocol: 'PROTOCOL_TO_BE_REWRITTEN',
    //     hostname: 'HOSTNAME_TO_BE_REWRITTEN',
    //     port: 'PORT_TO_BE_REWRITTEN'
    // };
    
    /** algolia search */
    var algoliaConfig = {
        applicationID: 'ZSH2P5ZPSS',
        searchAPIKey:'5b7324fd0a876e4bbba6e0885f70dea5',
        index : 'kore.lambda'
    }

    var chatConfig = {
        botOptions: botOptions,
        algoliaConfig,
        allowIframe: false, // set true, opens authentication links in popup window, default value is "false"
        isSendButton: false, // set true, to show send button below the compose bar
        isTTSEnabled: false, // set true, to hide speaker icon
        ttsInterface: 'webapi', // webapi or awspolly , where default is webapi
        isSpeechEnabled: false, // set true, to hide mic icon
        allowGoogleSpeech: true, // set true, to use Google speech engine instead KORE.AI engine.This feature requires valid Google speech API key. (Place it in 'web-kore-sdk/libs/speech/key.js')
        allowLocation: true, // set false, to deny sending location to server
        loadHistory: true, // set true to load recent chat history
        messageHistoryLimit: 10, // set limit to load recent chat history
        autoEnableSpeechAndTTS: false, // set true, to use talkType voice keyboard.
        graphLib: 'd3', // set google, to render google charts.This feature requires loader.js file which is available in google charts documentation.
        googleMapsAPIKey: '',
        minimizeMode: true, // set true, to show chatwindow in minimized mode, If false is set remove #chatContainer style in chatwindow.css
        multiPageApp: {
            enable: false, //set true for non SPA(Single page applications)
            userIdentityStore: 'localStorage', //'localStorage || sessionStorage'
            chatWindowStateStore: 'localStorage' //'localStorage || sessionStorage'
        },
        supportDelayedMessages: true, // enable to add support for renderDelay in message nodes which will help to render messages with delay from UI
        maxTypingIndicatorTime: 10000, //time in milliseconds,typing indicator will be stopped after this time limit,even bot doesn't respond
        pickersConfig: {
            showDatePickerIcon: false, //set true to show datePicker icon
            showDateRangePickerIcon: false, //set true to show dateRangePicker icon
            showClockPickerIcon: false, //set true to show clockPicker icon
            showTaskMenuPickerIcon: false, //set true to show TaskMenu Template icon
            showradioOptionMenuPickerIcon: false //set true to show Radio Option Template icon
        },
        sendFailedMessage: {
            MAX_RETRIES: 3
        }
    }
    /* 
        allowGoogleSpeech will use Google cloud service api.
        Google speech key is required for all browsers except chrome.
        On Windows 10, Microsoft Edge will support speech recognization.
     */

    KoreSDK.chatConfig = chatConfig
})(window.KoreSDK)
