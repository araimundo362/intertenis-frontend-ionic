import { Preferences } from '@capacitor/preferences';

export const useStorage = () => {

    const setValue = async (key: string, value: string) => {
        await Preferences.set({
            key,
            value,
          });
    }

    const getValue = async (name:string) => {
        const { value } = await Preferences.get({ key: name });

        if (value) return  JSON.parse(value);
    }

    const clearStorage = async () => {
        await Preferences.remove({ key: 'name' });
    }

    return {
        setValue,
        getValue,
        clearStorage
    }
};
