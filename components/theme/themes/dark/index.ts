import { generate } from '@ant-design/colors';
import { TinyColor } from '@ctrl/tinycolor';
import type { ColorPalettes, MapToken, PresetColorType, SeedToken } from '../../interface';
import { defaultPresetColors } from '../seed';
import genColorMapToken from '../shared/genColorMapToken';
import genCommonMapToken from '../shared/genCommonMapToken';
import {
  generateBgPalettes,
  generateErrorPalettes,
  generateInfoPalettes,
  generatePrimaryPalettes,
  generateSuccessPalettes,
  generateTextAlphaPalettes,
  generateWarningPalettes,
} from './palettes';

export default function derivative(token: SeedToken): MapToken {
  const { colorPrimary, colorSuccess, colorWarning, colorError, colorInfo } = token;

  const colorPalettes = Object.keys(defaultPresetColors)
    .map((colorKey: keyof PresetColorType) => {
      const colors = generate(token[colorKey], { theme: 'dark' });

      return new Array(10).fill(1).reduce((prev, _, i) => {
        prev[`${colorKey}-${i + 1}`] = colors[i];
        return prev;
      }, {}) as ColorPalettes;
    })
    .reduce((prev, cur) => {
      prev = {
        ...prev,
        ...cur,
      };
      return prev;
    }, {} as ColorPalettes);

  const primaryColors = generatePrimaryPalettes(colorPrimary);
  const successColors = generateSuccessPalettes(colorSuccess);
  const warningColors = generateWarningPalettes(colorWarning);
  const errorColors = generateErrorPalettes(colorError);
  const infoColors = generateInfoPalettes(colorInfo);
  const bgColors = generateBgPalettes('#000');
  const textColors = generateTextAlphaPalettes('#fff');

  return {
    ...token,
    ...colorPalettes,

    // Colors
    ...genColorMapToken({
      primaryPalettes: primaryColors,
      successPalettes: successColors,
      warningPalettes: warningColors,
      errorPalettes: errorColors,
      infoPalettes: infoColors,
      bgPalettes: bgColors,
      textAlphaPalettes: textColors,
    }),

    colorPrimaryOutline: new TinyColor(colorPrimary).setAlpha(0.2).toRgbString(),
    colorErrorOutline: new TinyColor(colorError).setAlpha(0.2).toRgbString(),
    colorWarningOutline: new TinyColor(colorWarning).setAlpha(0.2).toRgbString(),

    ...genCommonMapToken(token),
  };
}