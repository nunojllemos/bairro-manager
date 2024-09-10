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
            home: {
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
                    },
                ],
            },
            away: {
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
                    },
                ],
            },
        },
    },
    {
        collection: 'games',
        timestamps: true,
    }
)

const GameModel = models.Game || model<Game>('Game', GameSchema)

export default GameModel
