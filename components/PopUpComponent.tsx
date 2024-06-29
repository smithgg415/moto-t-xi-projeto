import PushNotification from 'react-native-push-notification';

PushNotification.createChannel(
  {
    channelId: "saida-moto-taxi", 
    channelName: "Your Channel Name", 
  },
  (created) => console.log(`CreateChannel returned '${created}'`)
);

// Enviar notificação
PushNotification.localNotification({
  channelId: "saida-moto-taxi", 
  title: "Minha Notificação", 
  message: "Seu moto táxi está a caminho!", 
});         