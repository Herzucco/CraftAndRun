var componentsModels =
{
    attackChooser : "return {name : datas.name || null}",

    attracted : "return {attractor : datas.attractor, player : datas.player || 0, speed : datas.speed || 3, name : datas.name}",

    attackOne : "return {force : datas.force || 1, coolDown : datas.coolDown ||1, count : datas.count || 1}",

    attackTwo : "return {force : datas.force || 2, coolDown : datas.coolDown || 2, count : datas.count || 2}",

    attackThree : "return {force : datas.force || 3, coolDown : datas.coolDown || 3, count : datas.count || 3}",

	cageArea : "return {restitution : 5}",

	ballCenter : "return {}",

	colliderCage : "return {}",

	fromPlayer : "return {player : datas.player};",

	catchForces : "return {force : datas.force || 0, element : datas.element || 'neutre'};",

    position2d : "return {x : datas.x || 0, y : datas.y || 0, limit : datas.limit};",

    size2d : "return {width : datas.width || 0, height : datas.height || 0, radius : datas.radius || 0};",

    renderShape : "return {color : datas.color || 0, shape : datas.shape || 0};",

    renderOpacity : "return {opacity : datas.opacity || 1};" ,

    velocity2d : "return {x : datas.x || 0, y : datas.y || 0, limit : datas.limit};",

    childs : "return { number : datas.number || 0 };",

    positionId : " return { corner : datas.corner || console.log('positionId de '+entity)};",

    parent : "return { number : datas.number || null};",

    renderStroke : "return {color : datas.color || 0, shape : datas.shape || 0, weight : datas.weight || 0};",

    renderPulse : "return {color : datas.color || 0, buffer : datas.buffer, compteur : datas.compteur, entity : entity };",

    attractorId : "return {number : datas.number || console.log('attractorId de '+entity+' est vide') };",

    life : "return {number : datas.number || '100' };",

    rectParentId : "return {number : datas.number || console.log('rectParentId de '+entity+' est vide') };",

    id : "return {number : datas.number };",

    idListLife : "return {number :  datas.number || entity };" ,

    moveListener : "return {keys : datas.keys || {37 : {x : -1, y : 0}, 39 : {x : 1, y : 0}}, entityInput : datas.entityInput}",

    inputListener : "return {keys : {}}"



}