import Posts from '@/components/Posts';
import { ScreenHeader } from '@/components/ScreenHeader';
import { View } from 'native-base';
import React from 'react';

export default function Progress() {
  return (
    <View>
        <ScreenHeader title='Registro de progresso' />

        <Posts />
    </View>
  );
}
