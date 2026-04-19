import { AppearanceSettings, ProfileSettings, PreferenceSettings } from '../components';



export const SettingPage = () => {

  return (
    <div className="space-y-8 p-6">
      <AppearanceSettings />
      <ProfileSettings />
      <PreferenceSettings />

    </div>
  );
};