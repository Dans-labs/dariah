export const colors = {
  actionBack: '#ffffee',
  actionHigh: '#ffff88',
  actionFore: '#0000bb',
  actionBorder: '#aaaa66',
  actionText: '#000044',
  widgetFixedFore: '#226622',
  widgetFixedBack: '#eeeeee',
  widgetBorder: '#aaaaaa',
  widgetVariaFore: '#000000',
  widgetVariaBack: '#ffffff',
  widgetHighFore: '#ffffff',
  widgetHighBack: '#444444',
}

export const action = {
  color: colors.actionFore,
  cursor: 'pointer',
}

const sizing = (size, radius, border, unit) => ({
  fontSize: size,
  borderRadius: `${radius}${unit}`,
  borderStyle: 'solid',
  borderWidth: `${border}${unit}`,
  paddingTop: `${radius * 0.2}${unit}`,
  paddingBottom: `${radius * 0.2}${unit}`,
  paddingLeft: `${radius * 0.8}${unit}`,
  paddingRight: `${radius * 0.8}${unit}`,
})

const buttonSizes = {
  large: ['medium', 6, 2, 'px'],
  medium: ['medium', 4, 1, 'px'],
  small: ['small', 2, 0, 'px'],
}

export const button = size => ({
  ...sizing(...buttonSizes[size]),
  backgroundColor: colors.actionBack,
  borderColor: colors.actionBorder,
  whiteSpace: 'nowrap',
  ...action,
})

