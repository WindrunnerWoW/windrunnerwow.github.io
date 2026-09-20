import { classInfo } from '$lib/talents/data';

export type NamedChange = {
  name: string;
  detail: string;
};

export type AbilityChange = NamedChange & {
  meta?: string;
};

export type TalentSection = {
  tree: string;
  items: NamedChange[];
};

export type ClassGuide = {
  slug: string;
  name: string;
  color: string;
  intro: string;
  abilities: AbilityChange[];
  mechanics: NamedChange[];
  baseline: NamedChange[];
  talents: TalentSection[];
};

export const classGuides: ClassGuide[] = [
  {
    slug: 'warrior',
    name: 'Warrior',
    color: '#C79C6E',
    intro:
      'Warrior changes keep the stance identity of Vanilla while making Arms, Fury and Protection more complete on their own. Attacks scale with your weapon, Slam can be used while moving, and the old weapon-specialization cluster is collapsed into talents that adapt to what you are holding.',
    abilities: [
      {
        name: 'Master Strike',
        meta: 'Arms · Row 3, 1 Rank · replaces Anger Management',
        detail:
          'An active strike whose secondary effect depends on your weapon type.'
      }
    ],
    mechanics: [],
    baseline: [
      {
        name: 'Slam',
        detail:
          'Deals a percentage of weapon damage, gains a fifth rank, and can be used while moving.'
      },
      {
        name: 'Bloodthirst',
        detail: 'Deals damage plus 35% of your attack power and increases your movement speed.'
      },
      {
        name: 'Mortal Strike',
        detail: 'Deals a percentage of weapon damage, so it scales with your weapon.'
      },
      {
        name: 'Whirlwind and Cleave',
        detail: 'Both scale from your melee damage.'
      },
      {
        name: 'Shield Slam',
        detail: 'Damage is modified by your attack power as well as your shield block value.'
      },
      {
        name: 'Enrage',
        detail: 'The damage bonus lasts its full duration.'
      },
      {
        name: 'Thunder Clap',
        detail: 'Usable in Defensive Stance as well as Battle Stance.'
      }
    ],
    talents: [
      {
        tree: 'Arms',
        items: [
          {
            name: 'Master of Arms',
            detail:
              'Row 5, 5 Ranks: replaces Axe, Mace, Sword and Polearm Specialization. One talent that adapts to whatever you are holding: Axes give critical strike chance, Maces ignore armor, Swords give a chance at an extra attack, and so on.'
          },
          {
            name: 'Master Strike',
            detail: 'Row 3, 1 Rank: new, replaces Anger Management.'
          },
          {
            name: 'Boundless Anger',
            detail: 'Row 5, 3 Ranks: new. Increases your maximum Rage above 100.'
          },
          {
            name: 'Improved Disciplines',
            detail: 'Row 5, 3 Ranks: new. Reduces the cooldown of Retaliation, Recklessness and Shield Wall.'
          },
          {
            name: 'Precision Cut',
            detail: 'Row 6, 3 Ranks: replaces Improved Hamstring. Increases the damage Execute gains per extra rage point spent.'
          },
          {
            name: 'Improved Slam',
            detail:
              'Moved from Fury to Arms. Row 6, 5 Ranks → 2 Ranks. Reduces Slam’s global cooldown as well as its cast time, so the saved cast time is not wasted.'
          },
          {
            name: 'Sweeping Strikes',
            detail: 'Applies to your abilities as well as your main-hand melee attacks.'
          },
          {
            name: 'Improved Thunder Clap',
            detail: 'Also increases Thunder Clap’s damage, not just its rage cost.'
          },
          {
            name: 'Two-Handed Weapon Specialization',
            detail: '5 Ranks → 3 Ranks. Also increases your skill in all two-handed weapons.'
          },
          {
            name: 'Improved Rend',
            detail: '3 Ranks → 2 Ranks.'
          },
          {
            name: 'Removed',
            detail:
              'Axe Specialization, Mace Specialization, Sword Specialization, Polearm Specialization, Anger Management, Improved Hamstring.'
          }
        ]
      },
      {
        tree: 'Fury',
        items: [
          {
            name: 'Blood Drinker',
            detail:
              'Row 6, 3 Ranks: new. While affected by Enrage, Death Wish or Recklessness, your attacks restore a share of your maximum health.'
          },
          {
            name: 'Improved Shouts',
            detail: 'Row 3, 5 Ranks: merges Improved Battle Shout and Improved Demoralizing Shout.'
          },
          {
            name: 'Battlefield Mobility',
            detail: 'Row 4, 2 Ranks: replaces Improved Intercept. Reduces the cooldown of Intercept, Intervene and Charge together.'
          },
          {
            name: 'Ravager',
            detail: 'Row 5, 3 Ranks: replaces Improved Cleave. Reduces Whirlwind’s cooldown and Cleave’s rage cost.'
          },
          {
            name: 'Improved Pummel',
            detail: 'Row 4, 2 Ranks: new. Pummel gains a chance to slow the target, and your spell school lockouts last longer.'
          },
          {
            name: 'Dual Wield Specialization',
            detail: 'Row 4 → Row 2. Also increases your chance to hit with your off-hand weapon.'
          },
          {
            name: 'Unbridled Wrath',
            detail: 'The extra rage chance is doubled while using a two-handed weapon.'
          },
          {
            name: 'Improved Berserker Rage',
            detail: 'Also grants a chance to break free from movement impairing effects.'
          },
          {
            name: 'Booming Voice',
            detail: 'Increases the area of all your shouts.'
          },
          {
            name: 'Flurry',
            detail: 'The number of hasted swings scales with the talent.'
          },
          {
            name: 'Removed',
            detail: 'Improved Battle Shout, Improved Demoralizing Shout, Improved Cleave, Improved Intercept.'
          }
        ]
      },
      {
        tree: 'Protection',
        items: [
          {
            name: 'Defensive Tactics',
            detail:
              'Row 6, 3 Ranks: new. While wearing a shield you keep part of Defensive Stance’s threat bonus in other stances, so stance dancing stops costing you the pull.'
          },
          {
            name: 'Gag Order',
            detail:
              'Row 4, 2 Ranks: replaces Improved Sunder Armor. Shield Slam gains extra dispel chance and Shield Bash gains a 50% chance to silence.'
          },
          {
            name: 'Improved Shield Slam',
            detail:
              'Row 5, 2 Ranks: replaces Improved Shield Bash. Cuts Shield Slam’s cooldown by 0.75 sec and grants extra block chance on your next attack.'
          },
          {
            name: 'Reprisal',
            detail: 'Row 5, 2 Ranks: new. Increases Revenge’s damage and gives it a chance to refund its rage cost.'
          },
          {
            name: 'Improved Intervene',
            detail:
              'Row 3, 2 Ranks: replaces Improved Shield Block. Grants a chance at immunity to movement impairing effects after using Intervene.'
          },
          {
            name: 'Shield Slam',
            detail: 'Row 7 → Row 5. Not a capstone talent, so it is reachable earlier.'
          }
        ]
      }
    ]
  },
  {
    slug: 'paladin',
    name: 'Paladin',
    color: '#F58CBA',
    intro:
      'Paladin is rebuilt around Judgements that stay up while you keep hitting, baseline Consecration, and melee Holy tools that make all three trees feel finished. Protection gets an active mitigation button, Holy reaches Holy Shock far earlier, and Retribution is driven by Crusader Strike and Zeal.',
    abilities: [
      {
        name: 'Crusader Strike',
        meta: 'Learned at Level: 10, five ranks at 10 / 22 / 34 / 46 / 58',
        detail:
          'A strike that damages the target and increases the Holy damage it takes, stacking up to 5 times for 30 sec. Rank 1: 20 mana, 30 damage, 5 bonus Holy per stack. Rank 2: 40 mana, 46 damage, 9 bonus Holy per stack. Rank 3: 70 mana, 70 damage, 14 bonus Holy per stack. Rank 4: 100 mana, 106 damage, 21 bonus Holy per stack. Rank 5: 120 mana, 160 damage, 29 bonus Holy per stack.'
      },
      {
        name: 'Zeal',
        detail:
          'Increases your attack and casting speed. Driven by the Retribution talent Vengeful Strikes, which makes each stack hit harder.'
      },
      {
        name: 'Daybreak',
        meta: 'Holy · Row 7, 1 Rank · new capstone',
        detail:
          'Critically healing an ally applies Daybreak. When that ally next takes damage, Daybreak is consumed to heal them.'
      },
      {
        name: 'Bulwark of the Righteous',
        meta: 'Protection · Row 7, 1 Rank · new capstone, three ranks of the ability',
        detail:
          'Bash the target with your shield for Holy damage and reduce the damage you take for a duration: an active mitigation button for Protection.'
      }
    ],
    mechanics: [
      {
        name: 'Judgement Duration',
        detail:
          'Your auto-attack swings refresh your own Judgement debuff on the target: any swing that lands for damage resets its timer, so a Judgement stays up as long as you keep hitting. Crusader Strike and Holy Strike go further and refresh every Paladin’s Judgement on that target, not only your own.'
      }
    ],
    baseline: [
      {
        name: 'Consecration',
        detail:
          'Baseline from level 20. Rank 5 costs 205 mana, and its damage wanes as the effect runs rather than ticking evenly.'
      },
      {
        name: 'Flash of Light and Seal of Wisdom',
        detail: 'Flash of Light gains a seventh rank at level 60; Seal of Wisdom has five ranks.'
      },
      {
        name: 'Blessing of Light',
        detail: 'Also increases the effect of Holy Shock on the target, not just Holy Light and Flash of Light.'
      },
      {
        name: 'Exorcism',
        detail: 'Generates reduced threat.'
      },
      {
        name: 'Hand of Freedom and Hand of Protection',
        detail:
          'Named as Hands rather than Blessings, so they do not clash with the one-Blessing-per-target rule in players’ heads.'
      },
      {
        name: 'Blessing of Sanctuary',
        detail: 'Reduces damage taken from all sources.'
      }
    ],
    talents: [
      {
        tree: 'Holy',
        items: [
          {
            name: 'Daybreak',
            detail: 'Row 7, 1 Rank: new capstone. Critically healing an ally applies Daybreak.'
          },
          {
            name: 'Blessed Strikes',
            detail:
              'Row 6, 5 Ranks: new. Crusader Strike has a chance to reset your Holy Shock cooldown, and Holy Strike’s healing is increased and scales with your healing power. This is what makes a melee Holy build work.'
          },
          {
            name: 'Ironclad',
            detail: 'Row 4, 2 Ranks: new. Increases your healing based on your armor from items.'
          },
          {
            name: 'Holy Judgement',
            detail: 'Row 2, 3 Ranks: new. Casting Judgement reduces the cast time of your next Holy Light.'
          },
          {
            name: 'Holy Shock',
            detail: 'Row 7 → Row 5. Not the capstone, so a Holy Paladin reaches it far sooner.'
          },
          {
            name: 'Divine Favor',
            detail: '1 Rank → 5 Ranks: reworked. A passive that improves your chance to critically strike with Holy Shock.'
          },
          {
            name: 'Illumination',
            detail: 'Always returns a percentage of the spell’s base cost after a critical heal.'
          },
          {
            name: 'Healing Light',
            detail: 'Also increases Holy Shock’s healing.'
          },
          {
            name: 'Holy Power',
            detail: 'Row 6, 5 Ranks → 3 Ranks. Increases the critical effect chance of Holy Light and Flash of Light.'
          },
          {
            name: 'Sanctity Aura and Improved Concentration Aura',
            detail: 'Both moved into Holy: Sanctity Aura from Retribution, Improved Concentration Aura from Protection.'
          },
          {
            name: 'Spiritual Focus',
            detail: '5 Ranks → 2 Ranks.'
          },
          {
            name: 'Removed',
            detail: 'Lasting Judgement, Improved Blessing of Wisdom, and Consecration, which is now baseline.'
          }
        ]
      },
      {
        tree: 'Protection',
        items: [
          {
            name: 'Bulwark of the Righteous',
            detail: 'Row 7, 1 Rank: new capstone.'
          },
          {
            name: 'Righteous Strikes',
            detail:
              'Row 6, 5 Ranks: replaces One-Handed Weapon Specialization. Increases Holy Strike’s threat and damage, and Crusader Strike grants Zealous Defense so your next block absorbs more.'
          },
          {
            name: 'Righteous Defense',
            detail: 'Row 5, 3 Ranks: new. Reduces the damage you take while Righteous Fury is active.'
          },
          {
            name: 'Improved Hand of Reckoning',
            detail: 'Row 4, 2 Ranks: new. Improves your chance to hit with Hand of Reckoning, so your taunt lands.'
          },
          {
            name: 'Redoubt',
            detail: 'Procs from any successful melee or ranged attack against you.'
          },
          {
            name: 'Reckoning',
            detail: 'Procs after you block.'
          },
          {
            name: 'Holy Shield',
            detail: 'Row 7 → Row 5. Its damage generates 50% additional threat.'
          },
          {
            name: 'Shield Specialization',
            detail: 'Also has a chance to restore 2% of maximum mana when you block, no more than once every 5 sec.'
          },
          {
            name: 'Precision',
            detail: 'Increases your chance to hit with spells as well as melee attacks.'
          },
          {
            name: 'Blessing of Sanctuary',
            detail: 'Row 5 → Row 3.'
          },
          {
            name: 'Anticipation',
            detail: '5 Ranks → 3 Ranks.'
          },
          {
            name: 'Removed',
            detail: 'One-Handed Weapon Specialization. Blessing of Kings moved to Retribution.'
          }
        ]
      },
      {
        tree: 'Retribution',
        items: [
          {
            name: 'Vengeful Strikes',
            detail:
              'Row 6, 5 Ranks: new. Crusader Strike deals extra damage, each stack of Zeal grants more attack and casting speed, and Holy Strike infuses you with Holy Might to increase your Strength.'
          },
          {
            name: 'Improved Blessings',
            detail:
              'Row 1, 5 Ranks: replaces Improved Blessing of Might. Covers Blessing of Wisdom as well as Blessing of Might, in one talent.'
          },
          {
            name: 'Vengeance',
            detail: 'Row 6 → Row 5. Boosts all your damage, stacks up to three times, and reduces your threat.'
          },
          {
            name: 'Vindication',
            detail: 'Row 3 → Row 4. Reduces the target’s damage dealt.'
          },
          {
            name: 'Two-Handed Weapon Specialization',
            detail: 'Row 5 → Row 4. Also increases your weapon skill with two-handed swords, maces and axes.'
          },
          {
            name: 'Seal of Command',
            detail: 'Row 3 → Row 5. Its bonus damage is based on your melee damage.'
          },
          {
            name: 'Blessing of Kings',
            detail: 'Moved out of Protection into Retribution Row 3.'
          },
          {
            name: 'Repentance',
            detail: 'Targets immune to the incapacitate take Holy damage.'
          },
          {
            name: 'Eye for an Eye and Improved Retribution Aura',
            detail: 'Repositioned within the tree.'
          }
        ]
      }
    ]
  },
  {
    slug: 'hunter',
    name: 'Hunter',
    color: '#ABD473',
    intro:
      'Hunter shots are cheaper and scale with your weapon, traps can be used in combat, and Survival is a real melee spec instead of a leftover tree. Beast Mastery is built around Kill Command and pet coordination, while Marksmanship revolves around resetting Aimed Shot.',
    abilities: [
      {
        name: 'Kill Command',
        meta: 'Beast Mastery capstone · Cost: 5% of base mana · Cooldown: 8 sec',
        detail:
          'Command your pet to instantly attack for 80% of its attack power. Usable only after you land a critical strike on the target.'
      },
      {
        name: 'Aspect of the Wolf',
        meta: 'Learned at Level: 10, seven ranks up to level 60',
        detail:
          'Increases your melee attack power. The melee counterpart to Aspect of the Hawk, and the anchor of the melee Survival build.'
      },
      {
        name: 'Carve',
        meta: 'Survival · Row 3, 1 Rank',
        detail: 'A sweeping melee attack hitting several enemies in a cone. Shares a cooldown with Multi-Shot.'
      },
      {
        name: 'Lacerate',
        meta: 'Survival · Row 5, 1 Rank · replaces Counterattack',
        detail:
          'Deals damage based on melee attack power and applies a bleed. Usable only after you critically strike the target, and hits 15% harder from the target’s side.'
      }
    ],
    mechanics: [
      {
        name: 'Pet Abilities',
        detail:
          'Growl costs 10 Focus, Thunderstomp’s cooldown is 40 sec, Shell Shield’s is 60 sec, and Scorpid Poison costs 25 Focus on a 3 sec cooldown. Furious Howl costs 50 Focus, and Screech has a 5 sec cooldown.'
      },
      {
        name: 'Stable Size',
        detail: 'You can keep three pets in the stable, buying each slot from a stablemaster.'
      }
    ],
    baseline: [
      {
        name: 'Arcane Shot',
        detail:
          'Deals a percentage of your ranged weapon damage on top of its Arcane damage, so it scales with your bow. It also costs roughly a third less mana at every rank (Rank 8: 190 → 125).'
      },
      {
        name: 'Aimed Shot',
        detail:
          'Mana cost cut by about a third (Rank 6: 310 → 205), but the cooldown is 26 sec. It is a cooldown, not a rotational shot: the Marksmanship tree is built around resetting it.'
      },
      {
        name: 'Raptor Strike',
        detail: 'Deals a percentage of weapon damage plus a flat bonus.'
      },
      {
        name: 'Mongoose Bite',
        detail: 'Usable on demand, deals a percentage of weapon damage, and strikes with both weapons while dual wielding.'
      },
      {
        name: 'Wing Clip',
        detail: 'Deals a percentage of weapon damage, and has a 3 sec cooldown.'
      },
      {
        name: 'Scorpid Sting',
        detail: 'Reduces the target’s physical damage done and attack speed. It has a single rank.'
      },
      {
        name: 'Serpent Sting',
        detail: 'Costs about a third less mana at every rank (Rank 9: 250 → 165).'
      },
      {
        name: 'Volley',
        detail: 'Costs about a third less mana (Rank 3: 490 → 330).'
      },
      {
        name: 'Rapid Fire',
        detail: 'Also reduces the cast time of Aimed Shot and Steady Shot, not just your attack speed.'
      }
    ],
    talents: [
      {
        tree: 'Beast Mastery',
        items: [
          {
            name: 'Kill Command',
            detail: 'Row 7, 1 Rank: new capstone. Your pet instantly attacks for 80% of its attack power after you land a critical strike.'
          },
          {
            name: 'Coordinated Assault',
            detail:
              'Row 3, 1 Rank: new. Hitting with Arcane Shot, Steady Shot or Raptor Strike makes your pet’s next attack also strike for Physical damage equal to 20% of your attack power. Once every 3 sec.'
          },
          {
            name: 'Swift Aspects',
            detail:
              'Row 1, 5 Ranks: new. Ranged attacks under Aspect of the Hawk have a chance to increase ranged attack speed; melee attacks under Aspect of the Wolf have a chance to increase melee attack speed.'
          },
          {
            name: 'Improved Primal Aspects',
            detail: 'Row 2, 3 Ranks.'
          }
        ]
      },
      {
        tree: 'Marksmanship',
        items: [
          {
            name: 'Lock and Load',
            detail:
              'Row 7, 1 Rank: new capstone, replaces Trueshot Aura. Steady Shot, Aimed Shot and Arcane Shot crits have a chance to reset Aimed Shot’s cooldown and trigger Lock and Load, which cuts Aimed Shot’s cast time and makes it hit every enemy between you and the target.'
          },
          {
            name: 'Experimental Ammunition',
            detail:
              'Row 5, 1 Rank: new. Aimed Shot deals extra damage as Fire, Arcane or Nature depending on the ammunition active, each with its own secondary effect.'
          },
          {
            name: 'Endless Quiver',
            detail:
              'Row 4, 2 Ranks: new. Auto Shot, Arcane Shot, Steady Shot and Multi-Shot have a chance to fire an extra ranged attack that costs no ammo.'
          },
          {
            name: 'Piercing Shots',
            detail:
              'Row 5, 2 Ranks: new. Crits from Multi-Shot, Steady Shot and Aimed Shot leave a bleed for a share of the damage, generating no threat.'
          },
          {
            name: 'Improved Stings',
            detail:
              'Row 2, 5 Ranks: replaces Improved Serpent Sting and Improved Scorpid Sting. One talent covers all three: Serpent Sting damage, Viper Sting mana drain, and extra attack-speed reduction on Scorpid Sting.'
          },
          {
            name: 'Swiftshot',
            detail: 'Row 3, 3 Ranks: new. Reduces the cooldown of Arcane Shot and Aimed Shot.'
          },
          {
            name: 'Improved Marksmanship',
            detail: 'Row 6, 2 Ranks: new. Increases the damage of Steady Shot and Aimed Shot.'
          },
          {
            name: 'Barrage',
            detail: 'Moved within Row 5. Also reduces the cast time of Volley.'
          },
          {
            name: 'Hawk Eye',
            detail: 'Row 3, 3 Ranks → 2 Ranks.'
          },
          {
            name: 'Removed',
            detail: 'Trueshot Aura, Improved Hunter’s Mark, Improved Arcane Shot, Improved Serpent Sting, Improved Scorpid Sting.'
          }
        ]
      },
      {
        tree: 'Survival',
        items: [
          {
            name: 'Untamed Trapper',
            detail:
              'Row 7, 1 Rank: new capstone, replaces Wyvern Sting. Immolation Trap and Explosive Trap cost less mana and scale with your melee attack power, and all traps can be placed in combat.'
          },
          {
            name: 'Lacerate',
            detail: 'Row 5, 1 Rank: new, replaces Counterattack.'
          },
          {
            name: 'Carve',
            detail: 'Row 3, 1 Rank: new.'
          },
          {
            name: 'Stinging Nettle',
            detail:
              'Row 4, 2 Ranks: new. Mongoose Bite and triggered Fire traps apply your highest rank of Serpent Sting for part of its duration, ignoring resistances and immunities.'
          },
          {
            name: 'Alone Against the World',
            detail:
              'Row 2, 2 Ranks: new. Increases all your damage while you have no pet out, which makes petless Survival a real build rather than a handicap.'
          },
          {
            name: 'Trap Mastery',
            detail:
              'Row 4 → Row 5, 2 Ranks → 3 Ranks. Also increases the duration of Freezing and Frost Trap and the damage of Immolation and Explosive Trap, on top of its resist reduction.'
          },
          {
            name: 'Savage Strikes',
            detail:
              'Also increases your off-hand weapon damage, and its critical strike bonus now covers Lacerate, Carve and Wing Clip as well as Raptor Strike and Mongoose Bite.'
          },
          {
            name: 'Killer Instinct',
            detail: 'Moved within Row 5. Also increases your melee critical strike damage bonus.'
          },
          {
            name: 'Lightning Reflexes',
            detail: 'Also grants melee attack power equal to a share of your Agility.'
          },
          {
            name: 'Surefooted',
            detail: 'Grants additional hit chance while dual wielding.'
          },
          {
            name: 'Entrapment and Improved Wing Clip',
            detail: '5 Ranks → 3 Ranks each.'
          }
        ]
      }
    ]
  },
  {
    slug: 'rogue',
    name: 'Rogue',
    color: '#FFF569',
    intro:
      'Rogue keeps combo-point identity but stops punishing target swaps, makes Blade Flurry baseline, and rebuilds Assassination around poisons. Combat drops the four weapon specializations, and Subtlety becomes a party-support tree with Mark for Death and Honor Among Thieves.',
    abilities: [
      {
        name: 'Noxious Assault',
        meta: 'Assassination · Row 7, 1 Rank · new capstone',
        detail:
          'Strikes with both weapons for damage plus 30% of your attack power and applies the poisons from both weapons. Awards combo points.'
      },
      {
        name: 'Envenom',
        meta: 'Assassination · Row 5, 1 Rank',
        detail:
          'A finishing move that increases the effectiveness of your poisons and your chance to apply them, lasting 12 to 28 sec depending on combo points spent.'
      },
      {
        name: 'Surprise Attack',
        meta: 'Combat · Row 5, 1 Rank · takes Blade Flurry’s slot',
        detail:
          'A strike dealing 25% of your attack power, usable only after the target dodges. Cannot be blocked, dodged or parried, and awards combo points.'
      },
      {
        name: 'Mark for Death',
        meta: 'Subtlety · Row 7, 1 Rank · new capstone, replaces Premeditation',
        detail:
          'A marking strike that reveals the target’s vulnerabilities, increasing your party’s attack power by 30% and their magical damage by up to 18% of your melee attack power. Cannot be blocked, dodged or parried.'
      },
      {
        name: 'Shadow of Death',
        meta: 'Subtlety · Row 5, 1 Rank',
        detail:
          'A finishing move that etches a sigil on the target. The sigil stores a share of all damage the target takes, up to a cap based on your attack power, then unleashes it as Physical damage when full or when it expires.'
      },
      {
        name: 'Smoke Bomb',
        meta: 'Subtlety · Row 3, 1 Rank',
        detail:
          'Creates a cloud of smoke around you. Everything inside it has a reduced chance to be hit by attacks and spells.'
      }
    ],
    mechanics: [
      {
        name: 'Combo Points on Target Change',
        detail: 'Changing target does not wipe your combo points.'
      },
      {
        name: 'Blade Flurry',
        detail: 'Now baseline rather than a Combat talent.'
      }
    ],
    baseline: [],
    talents: [
      {
        tree: 'Assassination',
        items: [
          {
            name: 'Noxious Assault',
            detail: 'Row 7, 1 Rank: new capstone.'
          },
          {
            name: 'Envenom',
            detail: 'Row 5, 1 Rank: new.'
          },
          {
            name: 'Taste for Blood',
            detail:
              'Row 4, 2 Ranks: new. Extends Rupture’s duration, and each Rupture increases your melee damage per combo point for its full duration, even if the Rupture itself does not land.'
          },
          {
            name: 'Efficient Poisons',
            detail:
              'Row 5, 3 Ranks: new. Reduces poison resist chance and gives poison applications a chance not to consume a charge.'
          },
          {
            name: 'Throwing Weapon Specialization',
            detail:
              'Row 3, 2 Ranks: new. Increases the range of Throw and Deadly Throw, and gives Deadly Throw a chance to apply your off-hand weapon poison.'
          },
          {
            name: 'Improved Blade Tactics',
            detail:
              'Row 2, 3 Ranks: replaces Improved Slice and Dice. Increases the duration of both Slice and Dice and Flourish.'
          },
          {
            name: 'Vigor',
            detail: 'Row 7 → Row 6, 1 Rank → 2 Ranks. No longer a capstone. Applying poison also has a chance to grant Energy.'
          },
          {
            name: 'Lethality',
            detail: 'Applies to all your combo point generating abilities.'
          },
          {
            name: 'Relentless Strikes',
            detail: 'As well as restoring Energy, it increases the damage of your finishing moves for a duration, stacking.'
          },
          {
            name: 'Remorseless Attacks',
            detail: 'The crit bonus after a killing blow applies to your next combo point generator, whatever it is.'
          },
          {
            name: 'Cold Blood',
            detail: 'Moved within Row 5. Also empowers Noxious Assault.'
          },
          {
            name: 'Vile Poisons and Improved Poisons',
            detail: '5 Ranks → 3 Ranks each.'
          },
          {
            name: 'Removed',
            detail: 'Improved Slice and Dice, Improved Kidney Shot. Improved Expose Armor moved to Subtlety.'
          }
        ]
      },
      {
        tree: 'Combat',
        items: [
          {
            name: 'Weapon specializations',
            detail:
              'Dagger, Mace, Sword and Fist Weapon Specialization are replaced by Close Quarters Combat (Row 5, 2 Ranks: crit with Maces, Daggers and Fist Weapons), Hack and Slash (Row 5, 2 Ranks: extra attack with Axes and Swords) and Concussive Blows (Row 4, 5 Ranks: chance to stun with a mace).'
          },
          {
            name: 'Surprise Attack',
            detail: 'Row 5, 1 Rank: new, takes Blade Flurry’s slot.'
          },
          {
            name: 'Blade Rush',
            detail:
              'Row 6, 2 Ranks: new. Increases your melee attack speed and shortens the time between Energy ticks by an amount based on your Agility.'
          },
          {
            name: 'Weapon Expertise',
            detail: 'Row 6 → Row 5. Covers Axe, Dagger, Fist, Mace and Sword.'
          },
          {
            name: 'Improved Backstab',
            detail: 'Moved within Row 2. Also gives Backstab a chance to award an additional combo point.'
          },
          {
            name: 'Aggression',
            detail: 'Also increases the damage of Riposte and Surprise Attack.'
          },
          {
            name: 'Opportunity and Setup',
            detail: 'Both moved out of Subtlety and into Combat.'
          },
          {
            name: 'Removed',
            detail: 'Improved Sinister Strike, Endurance, and Blade Flurry, which is now baseline.'
          }
        ]
      },
      {
        tree: 'Subtlety',
        items: [
          {
            name: 'Mark for Death',
            detail: 'Row 7, 1 Rank: new capstone, replaces Premeditation.'
          },
          {
            name: 'Tricks of the Trade',
            detail:
              'Row 6, 5 Ranks: replaces Deadliness. Your opening moves, and your finishing moves per combo point, have a chance to increase your party members’ critical strike chance. Stacks.'
          },
          {
            name: 'Shadow of Death',
            detail: 'Row 5, 1 Rank: new.'
          },
          {
            name: 'Honor Among Thieves',
            detail: 'Row 6, 2 Ranks: new. Physical critical strikes by you or nearby party members grant you Energy.'
          },
          {
            name: 'Smoke Bomb',
            detail: 'Row 3, 1 Rank: new.'
          },
          {
            name: 'Cloaked in Shadows',
            detail:
              'Row 4, 2 Ranks: new. Vanishing cloaks you and nearby party members in a shield absorbing a share of your maximum health.'
          },
          {
            name: 'Blackjack',
            detail:
              'Row 4, 2 Ranks: replaces Improved Sap. Returns you to stealth after Sap, and puts a damage reduction on targets when your Sap or Blind ends or fails to apply.'
          },
          {
            name: 'Hemorrhage',
            detail: 'Row 5 → Row 3. Deals a percentage of weapon damage and increases Physical damage taken by a percentage.'
          },
          {
            name: 'Serrated Blades',
            detail: 'Row 4 → Row 2. Also increases Garrote damage, not just Rupture.'
          },
          {
            name: 'Improved Ambush',
            detail: 'Row 3 → Row 2. Refunds Energy when your Ambush does not critically strike.'
          },
          {
            name: 'Camouflage',
            detail: 'Row 2 → Row 1. Also reduces the chance enemies detect you while stealthed.'
          }
        ]
      }
    ]
  },
  {
    slug: 'priest',
    name: 'Priest',
    color: '#FFFFFF',
    intro:
      'Priest healing tools that used to sit behind talent walls become baseline, Lightwell no longer needs to be clicked, and Shadowform can still use Holy Nova. Discipline, Holy and Shadow each get a clearer end-of-tree identity without copying later expansions wholesale.',
    abilities: [
      {
        name: 'Chastise',
        meta: 'Discipline · Row 7, 1 Rank · new capstone, replaces Power Infusion',
        detail:
          'Causes Holy damage. On an enemy it disorients them until they take damage; on an ally it increases their attack and casting speed, for longer if the damage crits.'
      },
      {
        name: 'Ascendance',
        meta: 'Holy · Row 7, 1 Rank · new capstone, replaces Lightwell',
        detail:
          'Purges all crowd control from you and empowers your healing: your heals cost less mana and cast faster, and allies you heal gain Apotheosis, increasing healing they receive.'
      }
    ],
    mechanics: [],
    baseline: [
      {
        name: 'Divine Spirit',
        detail:
          'Baseline for every Priest from level 30. It is also far cheaper (Rank 3: 785 → 340, Rank 4: 970 → 445) and gains a fifth rank at level 60.'
      },
      {
        name: 'Lightwell',
        detail:
          'Baseline from level 30, and rebuilt so that nobody has to click it. Whenever you heal a friendly target with Lesser Heal, Flash Heal, Heal or Greater Heal, the Lightwell heals another injured ally nearby. Cooldown 10 min → 5 min.'
      },
      {
        name: 'Smite',
        detail: 'Costs 40 mana and gains a ninth rank.'
      },
      {
        name: 'Holy Nova',
        detail:
          'Costs 180 mana and can be cast in Shadowform: it is the one Holy spell Shadowform does not lock out, at the cost of damaging you.'
      },
      {
        name: 'Prayer of Healing',
        detail: 'Can target another party.'
      }
    ],
    talents: [
      {
        tree: 'Discipline',
        items: [
          {
            name: 'Chastise',
            detail: 'Row 7, 1 Rank: new capstone, replaces Power Infusion.'
          },
          {
            name: 'Enlighten',
            detail:
              'Row 5, 1 Rank: new. Brings a party member under your tutelage. Your Discipline and Holy casts have a chance to burn them for a share of their health as Holy damage and increase both your and their spell damage and healing.'
          },
          {
            name: 'Resurgent Shield',
            detail:
              'Row 5, 1 Rank: new, takes Divine Spirit’s slot. When Power Word: Shield breaks, part of its mana cost is refunded and your Holy damage and healing increase based on how much the shield absorbed.'
          },
          {
            name: 'Purifying Flames',
            detail: 'Row 4, 2 Ranks: new. Holy Fire has a chance to interact with nearby effects.'
          },
          {
            name: 'Piercing Light',
            detail: 'Row 1, 3 Ranks: new. Reduces the chance enemies resist your spells.'
          },
          {
            name: 'Searing Light',
            detail:
              'Moved from Holy to Discipline. Row 4, 2 Ranks → 3 Ranks: reworked. Your damaging Holy and Discipline crits have a chance to make your next Smite instant and cheaper.'
          },
          {
            name: 'Mental Strength',
            detail: '5 Ranks → 3 Ranks: reworked. Increases your total Intellect and your spell casting speed.'
          }
        ]
      },
      {
        tree: 'Holy',
        items: [
          {
            name: 'Ascendance',
            detail: 'Row 7, 1 Rank: new capstone, replaces Lightwell.'
          },
          {
            name: 'Reservoir of Light',
            detail: 'Row 5, 3 Ranks: new. Increases the effectiveness of Lightwell’s healing.'
          },
          {
            name: 'Book of Prayer',
            detail:
              'Row 5, 2 Ranks: replaces Improved Prayer of Healing. You regain part of a healing spell’s mana cost whenever it differs from your previous heal, which rewards varying your casts instead of spamming one button.'
          },
          {
            name: 'Empowered Recovery',
            detail: 'Row 4, 2 Ranks: new. Extends Renew’s duration and increases your healing on targets already affected by it.'
          },
          {
            name: 'Divinity',
            detail: 'Row 1, 5 Ranks: replaces Holy Specialization. Increases the critical effect chance of your Holy and Discipline spells.'
          },
          {
            name: 'Holy Focus',
            detail: 'Row 1, 2 Ranks: replaces Healing Focus. Avoids interruption while casting any Holy spell, not just heals.'
          },
          {
            name: 'Improved Healing',
            detail: 'Also reduces the mana cost of Prayer of Healing.'
          },
          {
            name: 'Holy Reach',
            detail: 'Row 4 → Row 2. Also extends the range of Chastise.'
          },
          {
            name: 'Spirit of Redemption',
            detail: 'Also increases your total Spirit while alive, so it works before you die as well as after.'
          },
          {
            name: 'Spell Warding',
            detail: '5 Ranks → 3 Ranks, moved within Row 2.'
          },
          {
            name: 'Removed',
            detail: 'Holy Specialization, Healing Focus, Improved Prayer of Healing, and Lightwell, which is now baseline.'
          }
        ]
      },
      {
        tree: 'Shadow',
        items: [
          {
            name: 'Vampiric Touch',
            detail:
              'Row 5, 2 Ranks: replaces Improved Vampiric Embrace. Increases the healing from Vampiric Embrace, and makes it return mana to your whole party equal to a share of your Shadow damage. Shadow’s answer to raid mana.'
          },
          {
            name: 'Shadow Weaving',
            detail:
              'Reworked. Your Shadow spells grant you a stacking Shadow Weaving buff, and your spells then apply a vulnerability scaled by how many stacks you hold.'
          },
          {
            name: 'Spirit Tap',
            detail: 'Also procs from a Mind Blast critical strike, not only from killing blows, so it works in a raid.'
          },
          {
            name: 'Improved Fade',
            detail: 'Row 4 → Row 3. Also reduces the threat returned to you when Fade ends.'
          },
          {
            name: 'Improved Mana Burn',
            detail: 'Moved out of Discipline into Shadow.'
          },
          {
            name: 'Shadow Reach',
            detail: '3 Ranks → 2 Ranks.'
          }
        ]
      }
    ]
  },
  {
    slug: 'shaman',
    name: 'Shaman',
    color: '#0070DE',
    intro:
      'Shaman gains two-handed axes and maces and Parry as baseline, then uses that room to finish Elemental, Enhancement and Restoration. Earthquake and Bloodlust sit at the bottom of their trees, Lightning Strike ties shields into melee, and Spirit Link replaces Mana Tide Totem.',
    abilities: [
      {
        name: 'Earthquake',
        meta: 'Elemental · Row 7, 1 Rank · new capstone, three ranks at 40 / 50 / 60',
        detail:
          'Breaks the earth beneath the target for Nature damage, splashing a share of it onto nearby enemies and leaving broken ground that slows them. After a delay the ground erupts in an aftershock.'
      },
      {
        name: 'Bloodlust',
        meta: 'Enhancement · Row 7, 1 Rank · new capstone',
        detail:
          'Increases your attack and casting speed, and while it is active your melee critical strikes increase the attack and casting speed of nearby party members.'
      },
      {
        name: 'Lightning Strike',
        meta: 'Enhancement · Row 3, 1 Rank · takes Two-Handed Axes and Maces’ slot',
        detail:
          'An instant strike for weapon damage plus Nature damage that also triggers an empowered version of your active shield, consuming charges.'
      },
      {
        name: 'Spirit Link',
        meta: 'Restoration · Row 7, 1 Rank · new capstone, replaces Mana Tide Totem, level 54, 10 min cooldown',
        detail:
          'Links an ally’s spirit to other group members within 35 yards. Damage taken by the target is distributed among the linked allies.'
      }
    ],
    mechanics: [
      {
        name: 'Two-Handed Axes and Maces, and Parry',
        detail: 'These are now baseline rather than Enhancement talents.'
      }
    ],
    baseline: [],
    talents: [
      {
        tree: 'Elemental',
        items: [
          {
            name: 'Earthquake',
            detail: 'Row 7, 1 Rank: new capstone.'
          },
          {
            name: 'Convection and Concussion',
            detail: 'Cover all your offensive Fire, Frost and Nature spells.'
          },
          {
            name: 'Elemental Mastery',
            detail:
              'Row 7 → Row 5: reworked. A duration buff increasing your Fire, Frost and Nature damage and reducing your offensive spell costs.'
          },
          {
            name: 'Elemental Focus',
            detail:
              'Triggers on a critical strike (from a spell or a melee attack), and then discounts your next two damage spells or abilities.'
          },
          {
            name: 'Elemental Devastation',
            detail:
              'Row 4 → Row 2: reworked. Grants flat spell and melee hit, and your melee crits grant additional spell hit.'
          },
          {
            name: 'Elemental Fury',
            detail:
              'Moved within Row 5, 1 Rank → 2 Ranks. Also increases your Frost, Fire and Nature spell damage outright, not only the critical strike bonus.'
          },
          {
            name: 'Improved Fire Totems',
            detail: 'Also increases your Searing Totem’s attack speed and range.'
          },
          {
            name: 'Reverberation',
            detail: '5 Ranks → 3 Ranks.'
          }
        ]
      },
      {
        tree: 'Enhancement',
        items: [
          {
            name: 'Bloodlust',
            detail: 'Row 7, 1 Rank: new capstone.'
          },
          {
            name: 'Stormstrike',
            detail: 'Row 7 → Row 5. No longer the capstone, so you can reach it without going all the way down the tree.'
          },
          {
            name: 'Lightning Strike',
            detail: 'Row 3, 1 Rank: new.'
          },
          {
            name: 'Elemental Weapons',
            detail:
              'Completely rebuilt. Each imbue grants its own benefit: Flametongue builds Fire damage as you hit, Frostbrand and the others each do something distinct.'
          },
          {
            name: 'Ancestral Guardian',
            detail:
              'Row 3, 3 Ranks: merges Anticipation and Toughness. Increases your armor from items and your dodge chance in one talent.'
          },
          {
            name: 'Element’s Grace',
            detail:
              'Row 6, 5 Ranks: replaces Weapon Mastery. Increases your damage with all weapons and with Stormstrike and Lightning Strike, plus the critical strike chance of your instant cast spells.'
          },
          {
            name: 'Spirit Armor',
            detail: 'Row 4, 2 Ranks: new. Increases the armor gained from shields and the threat you generate while wearing one.'
          },
          {
            name: 'Stable Shields',
            detail:
              'Row 2, 3 Ranks: replaces Improved Lightning Shield. Adds charges to all your shield spells at the cost of a longer cooldown between activations.'
          },
          {
            name: 'Totemic Alignment',
            detail:
              'Row 2, 2 Ranks: replaces Guardian Totems. Transfers part of the threat your totems generate onto you, so they stop being killed.'
          },
          {
            name: 'Calming Winds',
            detail:
              'Row 3, 3 Ranks: new. Reduces threat from your physical attacks, weapon imbues, Lightning Strike and Stormstrike, but not while Rockbiter Weapon is active, so it does not undercut tanking.'
          },
          {
            name: 'Ancestral Knowledge',
            detail: 'Increases the total value of all your stats.'
          },
          {
            name: 'Enhancing Totems',
            detail: 'Row 3 → Row 5. Also reduces the cooldown of Grounding Totem and improves Stoneskin Totem.'
          },
          {
            name: 'Flurry',
            detail: 'The number of hasted swings scales with the talent.'
          },
          {
            name: 'Removed',
            detail:
              'Weapon Mastery, Guardian Totems, Improved Lightning Shield, Improved Weapon Totems, Anticipation, Toughness, and Two-Handed Axes and Maces and Parry, which are no longer talents.'
          }
        ]
      },
      {
        tree: 'Restoration',
        items: [
          {
            name: 'Spirit Link',
            detail: 'Row 7, 1 Rank: new capstone, replaces Mana Tide Totem.'
          },
          {
            name: 'Improved Water Shield',
            detail:
              'Row 4, 3 Ranks: new. Water Shield also restores mana every 5 sec, and your total mana regeneration increases for each globe still active.'
          },
          {
            name: 'Undertow',
            detail:
              'Row 5, 2 Ranks: new. Healing Wave and Lesser Healing Wave have a chance to restore a Water Shield charge, or to consume one for a benefit when already at maximum.'
          },
          {
            name: 'Tidal Surge',
            detail:
              'Row 5, 2 Ranks: new. Healing a target affected by Healing Way has a chance to refund part of the spell’s base mana cost.'
          },
          {
            name: 'Ancestral Swiftness',
            detail:
              'Row 5, 1 Rank: replaces Nature’s Swiftness. Makes your next Nature spell instant, but damaging spells cast this way have reduced effectiveness: it is a healing cooldown, not a burst opener.'
          },
          {
            name: 'Improved Chain Heal',
            detail: 'Row 6, 5 Ranks: replaces Purification. Reduces the cast time of Chain Heal.'
          },
          {
            name: 'Nature’s Grace',
            detail: 'Row 3, 3 Ranks: replaces Healing Grace. Reduces the threat generated by your Nature spells.'
          },
          {
            name: 'Healing Way',
            detail:
              'Row 5 → Row 3. Lesser Healing Wave and Chain Heal can also apply it, and it empowers your next Healing Wave or Chain Heal.'
          },
          {
            name: 'Totemic Mastery',
            detail: 'Increases the duration of your helpful totems and the mana Totemic Recall refunds.'
          },
          {
            name: 'Tidal Focus',
            detail: 'Also reduces the mana cost of your totems.'
          },
          {
            name: 'Restorative Totems',
            detail: 'Reduces Mana Spring Totem’s cost and increases Healing Stream Totem’s effect.'
          },
          {
            name: 'Healing Focus',
            detail: '5 Ranks → 2 Ranks.'
          },
          {
            name: 'Tidal Mastery',
            detail: 'Row 4 → Row 2.'
          },
          {
            name: 'Removed',
            detail: 'Mana Tide Totem, Purification, Totemic Focus, Nature’s Guidance, Healing Grace, Nature’s Swiftness.'
          }
        ]
      }
    ]
  },
  {
    slug: 'mage',
    name: 'Mage',
    color: '#40C7EB',
    intro:
      'Arcane is no longer a thin mana tree: Arcane Power is a dangerous haste cooldown, Resonance Cascade can duplicate spells, and Arcane Rupture empowers Missiles. Fire gains Hot Streak without locking you into Scorch, and Frost gets Icicles as a high-risk channel with an answer for freeze-immune bosses.',
    abilities: [
      {
        name: 'Arcane Rupture',
        meta: 'Arcane · Row 3, 1 Rank · replaces Arcane Resilience',
        detail: 'Grants the Arcane Rupture ability, which empowers your next Arcane Missiles.'
      },
      {
        name: 'Icicles',
        meta: 'Frost · Row 5, 1 Rank',
        detail:
          'Freezes you in place and launches icicles at the enemy for heavy Frost damage over its duration. Damage taken has a high chance to shatter your icy prison, dealing 30% of your base health to you. Canceling it early does not remove that risk.'
      }
    ],
    mechanics: [],
    baseline: [],
    talents: [
      {
        tree: 'Arcane',
        items: [
          {
            name: 'Arcane Power',
            detail:
              'Row 7 capstone: completely reworked. Increases your casting speed while draining a percentage of your maximum mana every second and reducing all mana gain. Fall below 10% maximum mana and you violently combust. A cooldown you have to steer, not just press.'
          },
          {
            name: 'Arcane Instability',
            detail:
              'Row 6 → Row 5: completely reworked. Your damaging Arcane spells have a chance to erupt, consuming 2% of your base mana to deal more damage.'
          },
          {
            name: 'Resonance Cascade',
            detail:
              'Row 6, 5 Ranks: new. Your damaging Arcane spells have a chance to duplicate for a share of the damage. It can trigger off itself, and duplicated Arcane Missiles channel in tandem with the original.'
          },
          {
            name: 'Arcane Rupture',
            detail: 'Row 3, 1 Rank: new, replaces Arcane Resilience.'
          },
          {
            name: 'Temporal Convergence',
            detail:
              'Row 4, 3 Ranks: new. Arcane Missiles have a chance to reset the cooldown of Arcane Rupture and refund its base mana cost on the next cast. Once every 15 sec.'
          },
          {
            name: 'Accelerated Arcana',
            detail:
              'Row 5, 1 Rank: new, replaces Arcane Mind. Increases the casting speed of your Arcane spells, and makes casting-speed effects also speed up your Arcane cooldown recovery and your Arcane Missiles ticks.'
          },
          {
            name: 'Arcane Potency',
            detail: 'Row 5, 2 Ranks: new. Increases the critical strike damage bonus of your Arcane spells.'
          },
          {
            name: 'Arcane Impact',
            detail:
              'Row 3, 3 Ranks: replaces Improved Arcane Explosion. Increases the critical strike chance of all your Arcane spells, not just Arcane Explosion.'
          },
          {
            name: 'Arcane Concentration',
            detail: 'Has an 8 sec internal cooldown between procs.'
          },
          {
            name: 'Arcane Meditation',
            detail: 'The mana regeneration it allows while casting is tripled while you are below a mana threshold.'
          },
          {
            name: 'Magic Absorption',
            detail:
              'Row 2 → Row 1, 5 Ranks → 3 Ranks. Returns mana on partial resists as well as full ones, which makes it fire constantly. Internal cooldown 1 sec → 2 sec.'
          },
          {
            name: 'Magic Attunement',
            detail: '2 Ranks → 1 Rank. Also allows Amplify Magic and Dampen Magic to be cast on enemies, up to level 62.'
          },
          {
            name: 'Wand Specialization',
            detail: 'Also increases your chance to hit with Wands, and gives wand attacks a chance to restore mana.'
          },
          {
            name: 'Arcane Focus',
            detail: 'Row 1 → Row 2.'
          },
          {
            name: 'Removed',
            detail: 'Arcane Mind, Arcane Resilience.'
          }
        ]
      },
      {
        tree: 'Fire',
        items: [
          {
            name: 'Hot Streak',
            detail:
              'Row 5, 2 Ranks: new. Fireball and Fire Blast crits have a chance to grant Hot Streak, cutting the cast time of your next Pyroblast. Stacks.'
          },
          {
            name: 'Fire Vulnerability',
            detail:
              'Row 4, 3 Ranks: replaces Improved Scorch. Fire Blast can now apply the Fire vulnerability debuff as well as Scorch, so you are not locked into Scorch to keep the stack up.'
          },
          {
            name: 'Improved Fire Blast',
            detail: 'Also reduces Fire Blast’s global cooldown, not just its own cooldown.'
          },
          {
            name: 'Flame Throwing',
            detail: 'Also increases the radius of your Blast Wave.'
          },
          {
            name: 'Blast Wave',
            detail: 'Moved within Row 5.'
          },
          {
            name: 'Removed',
            detail: 'Improved Scorch.'
          }
        ]
      },
      {
        tree: 'Frost',
        items: [
          {
            name: 'Icicles',
            detail: 'Row 5, 1 Rank: new.'
          },
          {
            name: 'Flash Freeze',
            detail:
              'Row 6, 2 Ranks: new. When a freeze fails because the target is permanently immune (every raid boss), you have a chance to gain Flash Freeze instead, which resets Icicles and speeds it up, so Frost has something to do against immune targets.'
          },
          {
            name: 'Ice Barrier',
            detail:
              'Also increases your Frost damage while the shield holds, on top of absorbing damage and preventing interrupts.'
          },
          {
            name: 'Shatter',
            detail: 'The critical strike bonus against frozen targets scales with the rank you have invested in the talent.'
          },
          {
            name: 'Arctic Reach',
            detail: 'Also extends the range of Icicles.'
          },
          {
            name: 'Piercing Ice, Ice Shards, Winter’s Chill and Improved Cone of Cold',
            detail: 'Repositioned within the tree to make room for Icicles and Flash Freeze. Piercing Ice and Ice Shards swap rows.'
          }
        ]
      }
    ]
  },
  {
    slug: 'warlock',
    name: 'Warlock',
    color: '#8787ED',
    intro:
      'Warlock changes treat soul shards like Hunter ammo, make Destruction less wasteful, and give Affliction and Demonology clearer payoffs. Soul Fire arrives earlier and scales, Conflagrate no longer eats your whole Immolate, and pets inherit more of your stats.',
    abilities: [
      {
        name: 'Dark Harvest',
        meta: 'Affliction · Row 7, 1 Rank · new capstone, replaces Dark Pact',
        detail: 'New Affliction capstone in place of Dark Pact.'
      },
      {
        name: 'Malediction',
        meta: 'Affliction · Row 5, 1 Rank',
        detail:
          'Curse of Agony can be active alongside your other curses, except Curse of Doom. Applying Curse of Recklessness, Shadows or Elements also applies your highest rank of Curse of Agony.'
      }
    ],
    mechanics: [
      {
        name: 'Soul Bags',
        detail:
          'A soul bag now gives every Soul Shard, Infernal Stone and Demonic Figurine you spend a chance not to be consumed, the way a quiver works for a Hunter’s ammo. The chance scales with the bag: 5% for a Small Soul Pouch, 10% for a Box of Souls, 15% for a Soul Pouch, 20% for a Felcloth Bag and 25% for a Core Felcloth Bag.'
      }
    ],
    baseline: [
      {
        name: 'Soul Fire',
        detail:
          'Learned at level 38, with four ranks. Mana cost 335 → 260 and cooldown 60 sec → 30 sec, and it now benefits significantly from spell damage.'
      },
      {
        name: 'Hellfire',
        detail: 'Mana cost 645 → 160.'
      },
      {
        name: 'Inferno',
        detail: 'Cooldown 60 min → 10 min, cost 100% → 80% of base mana.'
      },
      {
        name: 'Ritual of Doom',
        detail:
          'Cooldown 60 min → 30 min, cost 100% → 80% of base mana, it needs fewer participants, and the Doomguard arrives under your command rather than having to be enslaved instantly or turning on the group. It also no longer sacrifices a random participant.'
      },
      {
        name: 'Conflagrate',
        detail: 'Consumes 3 sec of your Immolate rather than the whole thing, so using it no longer wipes your damage over time effect.'
      },
      {
        name: 'Searing Pain',
        detail: 'No longer causes a high amount of threat, which makes it usable outside of tanking situations.'
      },
      {
        name: 'Siphon Life',
        detail: 'Transfers health over the full duration rather than in fixed per-tick amounts.'
      }
    ],
    talents: [
      {
        tree: 'Affliction',
        items: [
          {
            name: 'Dark Harvest',
            detail: 'Row 7, 1 Rank: new capstone, replaces Dark Pact.'
          },
          {
            name: 'Malediction',
            detail: 'Row 5, 1 Rank: new.'
          },
          {
            name: 'Soul Siphon',
            detail:
              'Row 4, 3 Ranks: new. Increases the damage of Drain Soul, Dark Harvest and Death Coil for each Affliction effect you have on the target, up to four.'
          },
          {
            name: 'Rapid Deterioration',
            detail:
              'Row 5, 2 Ranks: new. Increases the casting speed of your Affliction spells, and casting speed effects also speed up your damage over time ticks.'
          },
          {
            name: 'Improved Drains',
            detail: 'Row 2, 2 Ranks: merges Improved Drain Soul, Improved Drain Life and Improved Drain Mana.'
          },
          {
            name: 'Resilient Shadows',
            detail: 'Row 2, 3 Ranks: new. Reduces the chance your Affliction spells are dispelled.'
          },
          {
            name: 'Fel Concentration',
            detail: '5 Ranks → 2 Ranks. Covers all your Affliction spells rather than only the three channeled Drains.'
          },
          {
            name: 'Nightfall',
            detail: 'Also procs from Dark Harvest and your Drain spells, not just Corruption and Drain Life.'
          },
          {
            name: 'Improved Curse of Weakness',
            detail: '3 Ranks → 2 Ranks. Improves the attack speed reduction specifically.'
          },
          {
            name: 'Curse of Exhaustion and Improved Curse of Exhaustion',
            detail: 'Curse of Exhaustion Row 5 → Row 3; Improved 4 Ranks → 2 Ranks.'
          },
          {
            name: 'Removed',
            detail: 'Dark Pact, Amplify Curse, Improved Drain Soul, Improved Drain Life, Improved Drain Mana.'
          }
        ]
      },
      {
        tree: 'Demonology',
        items: [
          {
            name: 'Power Overwhelming',
            detail: 'Row talent: new.'
          },
          {
            name: 'Soul Entrapment',
            detail: 'Row talent: new.'
          },
          {
            name: 'Demonic Precision',
            detail: 'Row 5, 3 Ranks: new. Passes on your hit and crit to your demon.'
          },
          {
            name: 'Unleashed Potential',
            detail: 'Row 6, 3 Ranks: new. Lets your demon benefit from your Fire and Shadow spell power.'
          },
          {
            name: 'Soul Link',
            detail: 'Remains the Row 7 capstone.'
          }
        ]
      },
      {
        tree: 'Destruction',
        items: [
          {
            name: 'Shadow Vulnerability',
            detail:
              'Row 1, 5 Ranks: replaces Improved Shadow Bolt. Shadow Bolt and Drain Soul have a chance to increase Shadow damage taken by the target, with a higher chance on critical hits, rather than only ever proccing from Shadow Bolt crits.'
          },
          {
            name: 'Improved Soul Fire',
            detail: 'Row 5, 2 Ranks: new. Soul Fire has a chance to refund a Soul Shard and increase your Fire damage.'
          },
          {
            name: 'Demonic Swiftness',
            detail: 'Row 2, 2 Ranks: merges Improved Firebolt and Improved Lash of Pain.'
          },
          {
            name: 'Aftermath',
            detail:
              '5 Ranks → 3 Ranks. Also increases Immolate’s periodic damage, and its proc slows the target by 50% rather than dazing it.'
          },
          {
            name: 'Intensity',
            detail: 'Row 4 → Row 3. Covers all your Fire spells rather than only Rain of Fire, Hellfire and Soul Fire.'
          },
          {
            name: 'Pyroclasm',
            detail: 'Row 5 → Row 4. Conflagrate can now trigger the stun.'
          },
          {
            name: 'Improved Immolate',
            detail: 'Increases Immolate and the damage of Hellfire.'
          },
          {
            name: 'Shadowburn',
            detail: 'Moved within Row 3.'
          },
          {
            name: 'Removed',
            detail: 'Improved Shadow Bolt, Improved Firebolt, Improved Lash of Pain.'
          }
        ]
      }
    ]
  },
  {
    slug: 'druid',
    name: 'Druid',
    color: '#FF7D0A',
    intro:
      'The vanilla design of the Druid is infamous for being pretty unfinished. Its mechanics weren’t fully realized until well into the first expansion. Because of this, there’s a lot of freedom on how to improve on the class while sticking with the “vanilla feeling.” That said, simply attempting to recreate the druid of later expansions is a cop-out, but we feel incorporating some iconic and fan-favorite abilities would be a good idea.',
    abilities: [
      {
        name: 'Savage Bite',
        meta: 'Learned at Level: 58 · Requires: Bear or Dire Bear Form · Cost: 30 Rage · Cooldown: 6 sec',
        detail:
          'Savagely bite the target, dealing 80% normal damage plus an additional 30 damage. Generates a high amount of threat.'
      },
      {
        name: 'Barkskin (Feral)',
        meta: 'Learned at Level: 44 / 52 / 60 (3 ranks) · Requires: Cat, Bear or Dire Bear Form · Cooldown: 10 min',
        detail:
          'Reduces Physical damage taken for the next several attacks, at the cost of reduced movement speed for the duration.'
      },
      {
        name: 'Swift Travel Form',
        meta: 'Learned at Level: 30 · Cost: 13% of base mana',
        detail: 'Usable outdoors and out of combat only.'
      },
      {
        name: 'Reshift',
        detail: 'Cancels and reapplies your current shapeshift form in one button.'
      },
      {
        name: 'Efflorescence',
        meta: 'Learned at Level: 60 (passive)',
        detail:
          'When another Druid overwrites your Rejuvenation or Regrowth, half of the remaining amount is delivered to that target instantly.'
      },
      {
        name: 'Wrath (Rank 9)',
        meta: 'Learned at Level: 60 · Cost: 210 mana',
        detail: 'A ninth rank, learned at level 60.'
      }
    ],
    mechanics: [
      {
        name: 'Using Items in Forms',
        detail:
          'Potions, bandages, food, and most on-use trinkets and weapons are useable in Cat, Bear and Dire Bear Form. A small number of items are individually flagged as unusable while shapeshifted.'
      },
      {
        name: 'Shifting Between Forms',
        detail:
          'Any form can be cast directly while you are already in another one: Bear to Cat, Cat to Travel, Travel to Bear. The new form replaces the old, with no need to cancel the form you are in first.'
      },
      {
        name: 'Combo Points on Target Change',
        detail:
          'Changing target does not wipe your combo points. You only ever hold one set at a time: building a point on a different target starts that target from zero and discards whatever you had banked.'
      }
    ],
    baseline: [
      {
        name: 'Insect Swarm',
        detail: 'Baseline for every Druid, learned at level 20 with five ranks up to level 60.'
      },
      {
        name: 'Faerie Fire (Feral)',
        detail: 'Baseline, learned at level 25 with four ranks up to level 54 and a 6 sec cooldown.'
      },
      {
        name: 'Tranquility',
        detail:
          'Heals your entire raid and ticks every second. In exchange the mana cost is doubled (925 → 1850 at Rank 4) and the cooldown is 30 min.'
      },
      {
        name: 'Regrowth',
        detail: 'Costs 20% less mana at every rank. Rank 9: 880 → 704 mana.'
      },
      {
        name: 'Hurricane',
        detail:
          'Has a 10 sec cooldown. It does not slow the attack speed of enemies caught in it without the new Balance talent Gale Winds.'
      },
      {
        name: 'Frenzied Regeneration',
        detail: 'Converts each point of Rage into a percentage of your total Stamina, so it scales with your gear. Cooldown is 5 min.'
      },
      {
        name: 'Shapeshifting costs',
        detail: 'Cat, Bear and Dire Bear Form cost 35% of base mana. Aquatic Form and Travel Form cost 13%.'
      },
      {
        name: 'Tiger’s Fury',
        detail: 'Also regenerates Energy over its duration, on top of its damage bonus.'
      },
      {
        name: 'Ferocious Bite',
        detail: 'Learned at level 24, with six ranks. Extra Energy is converted into a percentage damage increase.'
      },
      {
        name: 'Rake',
        detail: 'Damage scales with your Attack Power.'
      },
      {
        name: 'Shred',
        detail: 'Has six ranks, and its bonus damage scales by rank.'
      },
      {
        name: 'Enrage',
        detail:
          'The damage bonus is not consumed by swinging: it lasts the full duration. The base armor penalty sits on its own separate debuff (−27% in Bear Form, −16% in Dire Bear Form), so canceling the Enrage buff early stops the Rage gain but does not remove the armor loss.'
      },
      {
        name: 'Soothe Animal',
        detail: 'Rank 2 affects Beasts up to level 40, and a resisted cast causes aggro.'
      }
    ],
    talents: [
      {
        tree: 'Balance',
        items: [
          {
            name: 'Eclipse',
            detail:
              'Row 7, 1 Rank: new capstone. Wrath damage has a chance to grant Arcane Eclipse, increasing your Arcane damage; Starfire damage has a chance to grant Nature Eclipse, increasing your Nature damage. The bonus scales with your spell power.'
          },
          {
            name: 'Balance of All Things',
            detail:
              'Row 6, 3 Ranks: new. Wrath refunds part of its mana cost against targets afflicted by Insect Swarm, and Starfire crits more often against targets affected by Moonfire.'
          },
          {
            name: 'Gale Winds',
            detail:
              'Row 6, 2 Ranks: new. Reduces the mana cost of Hurricane and gives it an attack-speed slow on the enemies caught in it.'
          },
          {
            name: 'Owlkin Frenzy',
            detail:
              'Row 5, 3 Ranks: new. Damage taken in Moonkin Form has a chance to enrage you, granting pushback resistance while casting and regenerating a percentage of your maximum mana per second. Can trigger once every 30 sec.'
          },
          {
            name: 'Guidance of the Dream',
            detail: 'Row 2, 3 Ranks: new. Gives you a chance to avoid interruption caused by damage while casting Balance spells.'
          },
          {
            name: 'Sylvan Blessing',
            detail:
              'Row 1, 2 Ranks: new. Killing a target that yields experience or honor has a chance to let your mana regenerate while casting for a short time.'
          },
          {
            name: 'Moonkin Form',
            detail:
              'Row 7 → Row 5. Reachable far earlier, and it also reduces the mana cost of your Balance spells by 20% on top of its armor and party spell-crit effects.'
          },
          {
            name: 'Moonfury',
            detail:
              'Row 6 → Row 3, 5 Ranks → 3 Ranks. Now boosts Hurricane and Insect Swarm as well as Starfire, Moonfire and Wrath.'
          },
          {
            name: 'Moonglow',
            detail: 'Row 5 → Row 4. Also reduces the mana cost of Hurricane and Insect Swarm.'
          },
          {
            name: 'Nature’s Reach',
            detail: 'Also extends the range of Insect Swarm, Remove Curse, Abolish Poison and Cure Poison.'
          },
          {
            name: 'Omen of Clarity',
            detail: 'Procs from your offensive spell casts as well as your melee attacks.'
          },
          {
            name: 'Improved Wrath',
            detail: 'Reduces Wrath’s global cooldown as well as its cast time, so the cast-time reduction is not wasted.'
          },
          {
            name: 'Natural Weapons',
            detail: '5 Ranks → 3 Ranks. Also increases your chance to hit with melee attacks and spells.'
          },
          {
            name: 'Improved Starfire',
            detail: 'Row 4 → Row 5, 5 Ranks → 3 Ranks.'
          },
          {
            name: 'Improved Moonfire',
            detail: '5 Ranks → 2 Ranks.'
          },
          {
            name: 'Nature’s Grace',
            detail: 'Moved one column within Row 5.'
          },
          {
            name: 'Removed',
            detail: 'Improved Entangling Roots, Improved Thorns.'
          }
        ]
      },
      {
        tree: 'Feral Combat',
        items: [
          {
            name: 'Berserk',
            detail:
              'Row 5, 1 Rank, 6 min cooldown: new. Removes all Fear effects, doubles Energy regeneration in Cat Form, and increases your total health by 20% in Bear Form. The health is lost when it ends. Lasts 20 sec.'
          },
          {
            name: 'Carnage',
            detail:
              'Row 6, 2 Ranks: new. Maul, Swipe and Savage Bite return part of their damage to you as healing, and Ferocious Bite gains a chance per combo point spent to refresh your Rake and Rip and add a combo point.'
          },
          {
            name: 'Ancient Brutality',
            detail:
              'Row 5, 2 Ranks: new. Dodging in Bear or Dire Bear Form generates Rage over several seconds, once every 9 sec. In Cat Form, your Bleed ticks restore Energy.'
          },
          {
            name: 'Open Wounds',
            detail:
              'Row 2, 3 Ranks: new. Increases the damage of Rip, and increases Claw damage for each active Bleed effect you have on the target.'
          },
          {
            name: 'Feral Swiftness',
            detail:
              'Row 3, 2 Ranks: replaces Feline Swiftness. Increases outdoor Cat Form movement speed and also increases your dodge chance in Cat, Bear and Dire Bear Form.'
          },
          {
            name: 'Blood Frenzy',
            detail:
              'Completely rebuilt. It extends Tiger’s Fury, makes Enrage instantly generate Rage, and gives both an attack-speed bonus. The extra combo point on Cat crits comes from Primal Fury.'
          },
          {
            name: 'Primal Fury',
            detail:
              'Row 4 → Row 3. Covers both halves: bonus Rage on Bear Form crits, and the extra combo point on Cat Form crits.'
          },
          {
            name: 'Predatory Strikes',
            detail:
              'Grants a percentage of your attack power in forms, and additionally increases the damage of Claw, Rake, Maul, Swipe and Savage Bite.'
          },
          {
            name: 'Improved Shred',
            detail: 'Moved within Row 4. Also increases Shred’s damage, not just its Energy cost.'
          },
          {
            name: 'Ferocity',
            detail: 'Also reduces the cost of Savage Bite.'
          },
          {
            name: 'Feral Instinct and Thick Hide',
            detail: '5 Ranks → 3 Ranks each.'
          },
          {
            name: 'Removed',
            detail: 'Feline Swiftness (replaced by Feral Swiftness), Savage Fury, and Faerie Fire (Feral), which is now baseline.'
          }
        ]
      },
      {
        tree: 'Restoration',
        items: [
          {
            name: 'Tree of Life Form',
            detail:
              'Row 7, 1 Rank: new capstone, learned at level 40. Increases armor from items, increases the healing power of nearby party members by a share of your Spirit, and reduces the mana cost of your heal-over-time spells by 20%. Your movement speed is reduced and you cannot cast damaging spells or Healing Touch while in the form.'
          },
          {
            name: 'Genesis',
            detail: 'Row 3, 3 Ranks: new. Increases the damage and healing of all your periodic magical spells and effects.'
          },
          {
            name: 'Aessina’s Bloom',
            detail:
              'Row 5, 2 Ranks: new. Healing a target already affected by Regrowth or Rejuvenation with Healing Touch reduces the cast time of your next Healing Touch and refunds part of its mana cost.'
          },
          {
            name: 'Preservation',
            detail: 'Row 5, 3 Ranks: new. Increases the periodic healing of Regrowth on targets also affected by Rejuvenation.'
          },
          {
            name: 'Swiftmend',
            detail: 'Row 7 → Row 3. Not a capstone: it sits at Row 3 and is reachable by any Druid with a light Restoration investment.'
          },
          {
            name: 'Subtlety',
            detail: 'Row 3 → Row 2. Reduces the threat generated by all your spells, not just your healing spells.'
          },
          {
            name: 'Improved Tranquility',
            detail: 'Row 5 → Row 6. Increases the healing done by Tranquility.'
          },
          {
            name: 'Tranquil Spirit',
            detail: 'Moved within Row 4. Also reduces the mana cost of Regrowth.'
          },
          {
            name: 'Gift of Nature',
            detail: 'Row 5 → Row 4.'
          },
          {
            name: 'Nature’s Swiftness, Reflection and Improved Regrowth',
            detail: 'Moved within the tree to make room for the new talents above.'
          },
          {
            name: 'Removed',
            detail: 'Improved Rejuvenation, Improved Enrage, and Insect Swarm, which is now baseline.'
          }
        ]
      }
    ]
  }
];

export const classGuideMap: Record<string, ClassGuide> = Object.fromEntries(
  classGuides.map((guide) => [guide.slug, guide])
);

export const classSlugs = classInfo.map((info) => info.slug);
