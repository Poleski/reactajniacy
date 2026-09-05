// TODO: Refactor tests after the update
// import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
// import { type IGameStateData, getLoadGame, getSaveGame } from './getSaveAndLoadGame';
//
// type IMockStorage = {
//     [key: string]: IGameStateData;
// };
//
// describe('test getSaveGame function', () => {
//     let mockStorage: IMockStorage;
//     let getItemSpy: Mock<(key: string) => string | null>;
//     let setItemSpy: Mock<(key: string, value: string) => void>
//
//     beforeEach(() => {
//         mockStorage = {
//             test: {
//                 activePlayer: 0,
//                 score: {
//                     red: 10,
//                     blue: 10
//                 },
//                 guesses: [[], []]
//             }
//         };
//
//         getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
//             return JSON.stringify(mockStorage[key]);
//         });
//
//         setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => {
//             mockStorage[key] = JSON.parse(value);
//         });
//     })
//
//     it('should save different fragments correctly', () => {
//         const testSaveGame = getSaveGame('test');
//
//         testSaveGame({
//             activePlayer: 1
//         });
//
//         expect(mockStorage.test.activePlayer).toBe(1);
//
//         testSaveGame({
//             activePlayer: 0,
//             score: {
//                 red: 9,
//                 blue: 10
//             },
//             guesses:[{pl: 'test', en: 'test', role: 'red', guessedBy: 1}]
//         })
//
//         expect(mockStorage.test.score.red).toBe(9);
//         expect(mockStorage.test.guesses).toHaveLength(2);
//         expect(mockStorage.test.guesses[0]).toHaveLength(0);
//         expect(mockStorage.test.guesses[1]).toHaveLength(1);
//         expect(mockStorage.test.guesses[1]).toBeTypeOf("object");
//     })
//
//     it('should load game correctly', () => {
//         const testSetActivePlayer = vi.fn();
//         const testSetScore = vi.fn();
//         const testSetGuesses = vi.fn();
//
//         const testLoadGame = getLoadGame(testSetActivePlayer, testSetScore, testSetGuesses, testSetAllClicked, 'test');
//         testLoadGame();
//
//         expect(testSetActivePlayer).toHaveBeenCalledWith(mockStorage.test.activePlayer);
//         expect(testSetScore).toHaveBeenCalledWith(mockStorage.test.score);
//         expect(testSetGuesses).toHaveBeenCalledWith(mockStorage.test.guesses);
//     });
//
//     afterEach(() => {
//         getItemSpy.mockRestore();
//         setItemSpy.mockRestore();
//     })
// })