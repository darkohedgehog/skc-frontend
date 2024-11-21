import React from 'react'
import {useTranslations} from 'next-intl';
import { Switch } from '../ui/Switch';
import { Label } from '../ui/Label';

const LangSwitch = () => {

    const t = useTranslations('LangSwitch')

  return (
    <div className="flex items-center space-x-2">
      <Switch id="language-mode" />
      <Label htmlFor="language-mode">
        language
      </Label>
    </div>
  )
}

export default LangSwitch;