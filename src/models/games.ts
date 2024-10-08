import { Game } from '@/types'
import { Schema, models, model } from 'mongoose'

const GameSchema: Schema = new Schema(
    {
        is_home: { type: Boolean },
        opponent: { type: String },
        date: {
            date: { type: String },
            start: { type: String },
        },
        final_result: { type: String },
        half_time_result: { type: String },
        cards: {
            yellow: { type: Number },
            red: { type: Number },
        },
        weather: {
            temp: { type: String },
            condition: { type: String },
        },
        teams: {
            bairro: {
                tactic: { type: String },
                initial: [
                    {
                        _id: { type: String },
                        position: { type: String },
                        goals: [
                            {
                                minute: { type: Number },
                            },
                        ],
                        cards: {
                            yellow: [
                                {
                                    minute: { type: Number },
                                },
                            ],
                            red: [
                                {
                                    minute: { type: Number },
                                },
                            ],
                        },
                        subs: [
                            {
                                minute: { type: Number },
                            },
                        ],
                    },
                ],
                bench: [
                    {
                        _id: { type: String },
                        position: { type: String },
                        goals: [
                            {
                                minute: { type: Number },
                            },
                        ],
                        cards: {
                            yellow: [
                                {
                                    minute: { type: Number },
                                },
                            ],
                            red: [
                                {
                                    minute: { type: Number },
                                },
                            ],
                        },
                        subs: [
                            {
                                minute: { type: Number },
                            },
                        ],
                    },
                ],
            },
            opponent: {
                tactic: { type: String },
                initial: [
                    {
                        name: { type: String },
                        position: { type: String },
                        goals: [
                            {
                                minute: { type: Number },
                            },
                        ],
                        cards: {
                            yellow: [
                                {
                                    minute: { type: Number },
                                },
                            ],
                            red: [
                                {
                                    minute: { type: Number },
                                },
                            ],
                        },
                        subs: [
                            {
                                minute: { type: Number },
                            },
                        ],
                    },
                ],
                bench: [
                    {
                        name: { type: String },
                        position: { type: String },
                        goals: [
                            {
                                minute: { type: Number },
                            },
                        ],
                        cards: {
                            yellow: [
                                {
                                    minute: { type: Number },
                                },
                            ],
                            red: [
                                {
                                    minute: { type: Number },
                                },
                            ],
                        },
                        subs: [
                            {
                                minute: { type: Number },
                            },
                        ],
                    },
                ],
            },
        },
        pre_game: { type: String },
        pos_game: { type: String },
    },
    {
        collection: 'games',
        timestamps: true,
    }
)

const GameModel = models.Game || model<Game>('Game', GameSchema)

export default GameModel
