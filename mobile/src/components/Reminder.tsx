import React, { useEffect, useState } from 'react';
import { scheduleNotificationAsync, cancelAllScheduledNotificationsAsync } from 'expo-notifications';
import { Text, VStack } from 'native-base';
import { Switch } from 'react-native';

export default function Reminder() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    if (notificationsEnabled) {
      scheduleNotifications();
    } else {
      cancelNotifications();
    }
  }, [notificationsEnabled]);

  const scheduleNotifications = async () => {
    try {
      await cancelAllScheduledNotificationsAsync();

      const intervalMs = 8 * 60 * 60 * 1000;
      const now = new Date().getTime();

      for (let i = 0; i < 3; i++) {
        const nextNotificationTime = now + intervalMs * (i + 1);
        await scheduleNotificationAsync({
          content: {
            title: 'Lembrete de Hidratação 💦',
            body: 'Não se esqueça de beber água!',
          },
          trigger: {
            seconds: Math.floor(nextNotificationTime / 1000)
          },
        });
      }
    } catch (error) {
      console.error('Erro ao agendar notificações:', error);
    }
  };

  const cancelNotifications = async () => {
    try {
      await cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Erro ao cancelar notificações:', error);
    }
  };

  return (
    <VStack flex={1} justifyContent='center' alignItems='center' space={2}>
      <Text textAlign='center' color='white' fontSize='md'>Ative as notificações para receber alertas de hidratação!</Text>
      <Switch
        value={notificationsEnabled}
        onValueChange={setNotificationsEnabled}
        style={{ marginBottom: 16 }}
      />
    </VStack>
  );
}