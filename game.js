kaboom({
  global: true,
  fullscreen: true,
  scale: 0.6,
  debug: true,
  clearColor: [0,0,0,1]
})



loadRoot('https://i.imgur.com/'),
loadSprite('guy-left', '1Xq9biB.png'),
loadSprite('guy-right', 'yZIb8O2.png'),
loadSprite('guy-down', 'r377FIM.png'),
loadSprite('guy-up', 'UkV0we0.png'),
loadSprite('left-wall', 'rfDoaa1.png'),
loadSprite('right-wall', 'SmHhgUn.png'),
loadSprite('top-wall', 'QA257Bj.png'),
loadSprite('bottom-wall', 'vWJWmvb.png'),
loadSprite('btm-left-cnr', 'awnTfNC.png'),
loadSprite('btm-right-cnr', '84oyTFy.png'),
loadSprite('top-left-cnr', 'xlpUxIm.png'),
loadSprite('top-right-cnr', 'z0OmBd1.png')
loadSprite('top-door', 'U9nre4n.png'),
loadSprite('left-door', 'okdJNls.png'),
loadSprite('fire-can', 'I7xSp7w.png'),
loadSprite('lantern', 'wiSiY09.png'),
loadSprite('slicer', 'c6JFi5Z.png'),
loadSprite('bad-guy', 'Ei1VnX8.png'),
loadSprite('stair', 'VghkL08.png'),
loadSprite('backgnd', 'u4DVsx6.png',)

scene('game', (
  // {level, score}
  ) => {

    layers(['backgnd', 'obj', 'ui'], 'obj')

    const map = [

'wtttttttttttttttttx',
'l                 r',
'l                 r',
'l                 r',
'l                 r',
'l                 r',
'l                 r',
'l                 r',
'l                 r',
'ybbbbbbbbbbbbbbbbbz',

    ]
   const levelConfig = {
     width: 48,
     height: 48,
    'l' : [sprite('left-wall')],
    'r' : [sprite('right-wall')],
    't' : [sprite('top-wall')],
    'b' : [sprite('bottom-wall')],
    'w' : [sprite('top-left-cnr')],
    'x' : [sprite('top-right-cnr')],
    'y' : [sprite('btm-left-cnr')],
    'z' : [sprite('btm-right-cnr')],
    '(' : [sprite('left-door')],
    '^' : [sprite('top-door')],
    '?' : [sprite('stair')],
    '*' : [sprite('slicer')],
    '1' : [sprite('bad-guy')],
    '#' : [sprite('lantern')],
    '%' : [sprite('fire-can')],

   }

    addLevel(map, levelConfig)
    // add([sprite('backgnd'), layer('backgnd')])
})
start("game", 
// {level: 0, score: 0 }
)







