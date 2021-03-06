import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import $ from 'jquery';

import {MonsterTypes, CardTypes} from 'client/app/constants';
import {ActionCreators} from 'client/app/redux/actions';
import {selectCardType} from 'client/app/redux/selectors';

import {LevelSelector} from 'client/app/components/editors/LevelSelector';
import {AttributeEditor} from 'client/app/components/editors/attributeEditor/AttributeEditor';
import {ActionTypeEditor} from 'client/app/components/editors/actionTypeEditor/ActionTypeEditor';
import {ImageSelector} from 'client/app/components/editors/ImageSelector';
import {TypeEditor} from 'client/app/components/editors/typeEditor/TypeEditor';
import {DescriptionEditor} from 'client/app/components/editors/descriptionEditor/DescriptionEditor';
import {PendulumInfoEditor} from 'client/app/components/editors/PendulumInfoEditor';
import {LinkArrowEditor} from 'client/app/components/editors/LinkArrowEditor';
import {AutoscalingInput} from 'client/app/components/common/autoscalingInput/AutoscalingInput';

import 'client/app/components/cards/Card.scss';
import image from 'client/app/assets/BlueEyesWhiteDragon.png';
import pendulumBaseSmall from 'client/app/assets/Series 10/Pendulum/PendulumBaseSmall.png';
import pendulumEffectSmall from 'client/app/assets/Series 10/Pendulum/PendulumEffectSmall.png';
import normalArtBox from 'client/app/assets/Series 10/ArtBox.png';


class Card extends React.Component{
    constructor(props){
        super(props);
    }

    getCardCenterEditor(){
        if (this.props.cardState.cardType === CardTypes.SPELL || this.props.cardState.cardType === CardTypes.TRAP){
            return(
                <ActionTypeEditor
                    cardType={this.props.cardState.cardType}
                    actionTypes={this.props.cardState.actionTypes}
                    updateActionTypes={this.props.updateActionTypes}
                />
           );

        }  
        else if (this.props.cardState.cardType === CardTypes.MONSTER){
            return (
                <LevelSelector 
                    level={this.props.cardState.level} 
                    updateLevel={this.props.updateLevel}
                    monsterType={this.props.cardState.monsterType}
                />
            );
        }
    }
    getSecondaryBattleStat(){
        if (this.props.cardState.monsterType === MonsterTypes.LINK){
            return (
                <div className="card--battle-points--link-rating">
                    <span>LINK-</span>
                    <span className="card--battle-points--link-rating-value">{_.filter(this.props.cardState.linkArrows, (linkArrow) => linkArrow).length}</span>
                </div>    
            );
        }
        else{
            return (
                <div>
                    <span>DEF</span><span className="battle-point-slash">/</span>
                    <input type="text" value={this.props.cardState.def} onChange={(event) => this.props.updateDef(event.target.value)}/>
                </div>        
            );
        }
    }

    getCardBottom(){
        if (this.props.cardState.attribute === 'SPELL' || this.props.cardState.attribute === 'TRAP'){
            return (
                <div className="ygo-card-bottom">
                    <DescriptionEditor
                        cardType={this.props.cardState.cardType}
                        monsterType={this.props.cardState.monsterType}
                        fusionMaterials={this.props.cardState.fusionMaterials}
                        updateFusionMaterials={this.props.updateFusionMaterials} 
                        synchroMaterials={this.props.cardState.synchroMaterials}
                        updateSynchroMaterials={this.props.updateSynchroMaterials}
                        xyzMaterials={this.props.cardState.xyzMaterials}
                        updateXyzMaterials={this.props.updateXyzMaterials}
                        effect={this.props.cardState.effect} 
                        updateEffect={this.props.updateEffect} 
                        lore={this.props.cardState.lore} 
                        updateLore={this.props.updateLore}/>
                </div>
            );
        }
        else{
            return (
                <div className="ygo-card-bottom">
                    <TypeEditor 
                        tribes={this.props.cardState.tribes} 
                        updateTribes={this.props.updateTribes}
                        monsterType={this.props.cardState.monsterType}
                        updateMonsterType={this.props.updateMonsterType} 
                        monsterHybridType={this.props.cardState.monsterHybridType}
                        updateMonsterHybridType={this.props.updateMonsterHybridType} 
                        monsterClass={this.props.cardState.monsterClass}
                        updateMonsterClass={this.props.updateMonsterClass}
                        monsterAbilities={this.props.cardState.monsterAbilities}
                        updateMonsterAbilities={this.props.updateMonsterAbilities}
                        isEffect={() => !_.isEmpty(this.props.cardState.effect)}/>
                    
                    <DescriptionEditor
                        cardType={this.props.cardState.cardType}
                        monsterType={this.props.cardState.monsterType}
                        fusionMaterials={this.props.cardState.fusionMaterials}
                        updateFusionMaterials={this.props.updateFusionMaterials} 
                        synchroMaterials={this.props.cardState.synchroMaterials}
                        updateSynchroMaterials={this.props.updateSynchroMaterials}
                        darkSynchroMaterials={this.props.cardState.darkSynchroMaterials}
                        updateDarkSynchroMaterials={this.props.updateDarkSynchroMaterials}
                        xyzMaterials={this.props.cardState.xyzMaterials}
                        updateXyzMaterials={this.props.updateXyzMaterials}
                        linkMaterials={this.props.cardState.linkMaterials}
                        updateLinkMaterials={this.props.updateLinkMaterials}
                        effect={this.props.cardState.effect} 
                        updateEffect={this.props.updateEffect} 
                        lore={this.props.cardState.lore} 
                        updateLore={this.props.updateLore}/>
                    <div className="ygo-card-battle-points">
                        <div>
                            <span>ATK</span><span className="battle-point-slash">/</span>
                            <input type="text" value={this.props.cardState.atk} onChange={(event) => this.props.updateAtk(event.target.value)}/>
                        </div>
                        <div className="ygo-card-battle-point-spacer">
                        </div>
                        {this.getSecondaryBattleStat()}                                     
                    </div>
                </div>
            );
        }
    }

    renderPendulumCard(){
        if (this.props.cardState.monsterHybridType === MonsterTypes.PENDULUM && this.props.cardState.cardType === CardTypes.MONSTER 
        && this.props.cardState.monsterType !== MonsterTypes.LINK){
            return (
                <div className="ygo-card-pendulum">
                    <img src={pendulumEffectSmall}/>
                    <img src={pendulumBaseSmall}/>
                </div>
            );
        }
        else if (this.props.cardState.monsterType === MonsterTypes.LINK && this.props.cardState.cardType === CardTypes.MONSTER){
            return (
                <div className="card--link-art--container">
                    <img className="card--normal-art-box" src={normalArtBox}/>
                    <LinkArrowEditor 
                        updateLinkArrow={this.props.updateLinkArrow}
                        linkArrows={this.props.cardState.linkArrows}
                    />
                </div>
            );
            
        }
        else{
            return (
                <div className="card--normal-art--container">
                    <img className="card--normal-art-box" src={normalArtBox}/>
                </div>
            );
        }
    }

    renderPendulumContainer(){
        if (this.props.cardState.monsterHybridType == MonsterTypes.PENDULUM && this.props.cardState.cardType == CardTypes.MONSTER
        && this.props.cardState.monsterType !== MonsterTypes.LINK){
            return (
                <PendulumInfoEditor
                    updatePendulumEffect={this.props.updatePendulumEffect}
                    updatePendulumLeftScale={(scale) => this.props.updatePendulumScale(scale, true)}
                    updatePendulumRightScale={(scale) => this.props.updatePendulumScale(scale, false)}
                    pendulumEffect={this.props.cardState.pendulumEffect}
                    leftPendulumScale={this.props.cardState.leftPendulumScale}
                    rightPendulumScale={this.props.cardState.rightPendulumScale}
                />
            );
        }
    }

    getClassNames(){
        var classNames = ['ygo-card-content'];
        if (this.props.cardState.cardType === CardTypes.SPELL){
            classNames.push('spell-card');
        }
        else if (this.props.cardState.cardType === CardTypes.TRAP){
            classNames.push('trap-card');
        }
        else{
            if (this.props.cardState.monsterType === MonsterTypes.FUSION){
                classNames.push('fusion-monster');
            }
            else if (this.props.cardState.monsterType === MonsterTypes.SYNCHRO){
                classNames.push('synchro-monster');
            }
            else if (this.props.cardState.monsterType === MonsterTypes.DARK_SYNCHRO){
                classNames.push('dark-synchro-monster');
            }
            else if (this.props.cardState.monsterType === MonsterTypes.RITUAL){
                classNames.push('ritual-monster');
            }
            else if (this.props.cardState.monsterType === MonsterTypes.XYZ){
                classNames.push('xyz-monster');
            }
            else if (this.props.cardState.monsterType === MonsterTypes.LINK){
                classNames.push('link-monster');
            }
            else if (this.props.cardState.effect.length > 0){
                classNames.push('effect-monster');
            }
            else{
                classNames.push('normal-monster');
            }
        }
        return classNames.join(' ');
    }

    render(){
        return (
            <div className={this.getClassNames()}>
                {this.renderPendulumCard()}
                <div className="ygo-card-top">
                    <AutoscalingInput
                        className="ygo-card-name"
                        placeholder="Enter a name here..."
                        value={this.props.cardState.name} 
                        onChange={(event) => this.props.updateName(event.target.value)}
                    />
                    <AttributeEditor 
                        updateAttribute={this.props.updateAttribute}
                        attribute={this.props.cardState.attribute}/> 
                </div>
                <div className="ygo-card-center">
                    {this.getCardCenterEditor()}
                    <ImageSelector
                        monsterHybridType={this.props.cardState.monsterHybridType}
                        monsterType={this.props.cardState.monsterType}
                        cardType={this.props.cardState.cardType}
                    />
                    <div className="ygo-card-set-id"></div>
                    {this.renderPendulumContainer()}
                </div>
                {this.getCardBottom()}
            </div>
        )
    }
}

// Hook up Redux store state to props of this Component.
const mapStateToProps = function(state){
    return {
        cardState: Object.assign({cardType: selectCardType(state)}, state.cardReducer)
    }
}

const mapDispatchToProps = function(dispatch){
    return {
        updateName: (name) => dispatch(ActionCreators.monster.updateName(name)),
        updateLevel: (level) => dispatch(ActionCreators.monster.updateLevel(level)),
        updateAttribute: (attribute) => dispatch(ActionCreators.general.updateAttribute(attribute)),
        updateActionTypes: (actionTypes) => dispatch(ActionCreators.action.updateActionTypes(actionTypes)),
        updateAtk: (atk) => dispatch(ActionCreators.monster.updateAtk(atk)),
        updateDef: (def) => dispatch(ActionCreators.monster.updateDef(def)),
        updateEffect: (effect) => dispatch(ActionCreators.general.updateEffect(effect)),
        updateLore: (lore) => dispatch(ActionCreators.general.updateLore(lore)),
        updatePendulumEffect: (pendulumEffect) => dispatch(ActionCreators.monster.updatePendulumEffect(pendulumEffect)),
        updatePendulumScale: (pendulumScale, isLeftNotRightScale) => dispatch(ActionCreators.monster.updatePendulumScale(pendulumScale, isLeftNotRightScale)),
        updateLinkArrow: (linkArrowValue, linkIndex) => dispatch(ActionCreators.monster.updateLinkArrow(linkArrowValue, linkIndex)),
        updateTribes: (tribes) => dispatch(ActionCreators.monster.updateTribes(tribes)),
        updateMonsterType: (type) => dispatch(ActionCreators.monster.updateMonsterType(type)),
        updateMonsterHybridType: (type) => dispatch(ActionCreators.monster.updateMonsterHybridType(type)),
        updateMonsterClass: (monsterClass) => dispatch(ActionCreators.monster.updateMonsterClass(monsterClass)),
        updateMonsterAbilities: (monsterAbilities) => dispatch(ActionCreators.monster.updateMonsterAbilities(monsterAbilities)),
        updateFusionMaterials: (fusionMaterials) => dispatch(ActionCreators.monster.updateFusionMaterials(fusionMaterials)),
        updateSynchroMaterials: (synchroMaterials) => dispatch(ActionCreators.monster.updateSynchroMaterials(synchroMaterials)),
        updateDarkSynchroMaterials: (darkSynchroMaterials) => dispatch(ActionCreators.monster.updateDarkSynchroMaterials(darkSynchroMaterials)),
        updateXyzMaterials: (xyzMaterials) => dispatch(ActionCreators.monster.updateXyzMaterials(xyzMaterials)),
        updateLinkMaterials: (linkMaterials) => dispatch(ActionCreators.monster.updateLinkMaterials(linkMaterials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);