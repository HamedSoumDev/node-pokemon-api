const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
              msg: 'Le nom est déja pris'
            },
            validate: {
                notEmpty: {msg: 'Le nom du pokemon ne peut être vide.'},
                notNull: {msg: 'Le nom du pokemon est une propriété requise.'}
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Utilisez uniquement des nombres entiers pour les points de vie.'},
                min: {
                    args: [0],
                    msg: 'Les points de vie doivent être supérieurs ou égales à 0'
                },
                 max: {
                    args: [999],
                    msg: 'Les points de vie doivent être inférieur ou égales à 999'
                },
                notNull: {msg: 'Les points de vie sont une propriété requise.'}
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
             validate: {
                isInt: {msg: 'Utilisez uniquement des nombres entiers pour les points de vie.'},
                 min: {
                    args: [0],
                    msg: 'Les points de vie doivent être supérieurs ou égales à 0'
                },
                 max: {
                    args: [999],
                    msg: 'Les points de vie doivent être inférieur ou égales à 999'
                },
                notNull: {msg: 'Les points de vie sont une propriété requise.'}
            }
        },
         picture: {
            type: DataTypes.STRING,
            allowNull: false,
             validate: {
                notNull: {msg: 'Les points de vie sont une propriété requise.'},
                isUrl: {msg: 'Les points de vie sont une propriété requise.'}
            }
        },
         types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split('.')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypesValid(value){
                    if(!value){
                        throw new Error('Un pokémon doit au moins avoir un type.')
                    }
                    if(value.split(',').length > 3) {
                        throw new Error('Un pokémon ne peux pas avoir plus de trois types.')
                    } 
                    value.split(',').forEach(type => {
                        if(!validTypes.includes(type)) {
                            throw new Error(`Le type d'un pokémon doit appartenir à la liste : ${validTypes}`)
                        }
                    });
                }
            }
        }
    },
    {
        timestamps: true,
        createdAt: 'Created',
        updatedAt: false
    }
)
}