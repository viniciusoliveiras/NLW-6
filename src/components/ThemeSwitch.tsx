import Switch from 'react-switch';
import { RiMoonLine, RiSunLine } from 'react-icons/ri';

import { useTheme } from '../hooks/useTheme';

export function ThemeSwitch() {
  const { toggleTheme, checked } = useTheme();
  return (
    <Switch
      onChange={toggleTheme}
      checked={checked}
      offColor='#FFC107'
      onColor='#835AFD'
      uncheckedIcon={
        <div
          style={{
            height: 28,
            width: 30,
            position: 'absolute',
            right: -4,
            top: 4,
            pointerEvents: 'none',
            opacity: 1,
            transition: 'opacity 0.25s ease 0s',
            color: '#000',
          }}
        >
          <RiSunLine fontSize='1.1rem' />
        </div>
      }
      checkedIcon={
        <div
          style={{
            height: 28,
            width: 30,
            position: 'absolute',
            right: -6,
            top: 4,
            pointerEvents: 'none',
            opacity: 1,
            transition: 'opacity 0.25s ease 0s',
          }}
        >
          <RiMoonLine fontSize='1.1rem' />
        </div>
      }
    />
  );
}
