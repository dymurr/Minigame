local successCb
local failCb
local resultReceived = false

RegisterCommand('minigame', function(source, args)
    exports["minigame"]:minigame(
    function()
        print("success")
    end,
    function()
        print("failure")
    end)
end)

RegisterNUICallback('result', function(data, cb)
    SetNuiFocus(false, false)
    resultReceived = true
    if data.success then
        successCb()
    else
        failCb()
    end
    cb('ok')
end)

exports('minigame', function(success, fail)
    resultReceived = false
    successCb = success
    failCb = fail
    SetNuiFocus(true, true)
    SendNUIMessage({
        type = 'open',
    })
end)