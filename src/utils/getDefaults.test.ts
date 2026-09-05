// import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
// import type { IContext } from "../models/context.models";
// import { getDefaultLang, getDefaultTheme } from './getDefaults';
//
// type IMockStorage = Partial<Pick<IContext, 'lang' | 'theme'>>
//
// describe('test getDefaultTheme and getDefaultTheme', () => {
//     const mockStorage: IMockStorage = {}
//     let getItemSpy: Mock<(key: string) => string | null>;
//     let navigatorSpy: Mock<() => string>;
//
//     beforeEach(() => {
//         getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
//             if (key === 'lang' || key === 'theme') {
//                 if (mockStorage[key]) {
//                     return mockStorage[key];
//                 }
//             }
//             return null;
//         });
//
//         // mocking a german browser to test if it defualts to english
//         navigatorSpy = vi.spyOn(window.navigator, 'language', 'get').mockReturnValue('de')
//
//         // overly complicated window.matchMedia mock
//         Object.defineProperty(window, 'matchMedia', {
//             writable: true,
//             value: vi.fn().mockImplementation(query => ({
//                 matches: true,
//                 media: query,
//                 onchange: null,
//                 addListener: vi.fn(),
//                 removeListener: vi.fn(),
//                 addEventListener: vi.fn(),
//                 removeEventListener: vi.fn(),
//                 dispatchEvent: vi.fn()
//             })),
//         });
//     })
//
//     it('returns theme from browser defaults', () => {
//         const theme = getDefaultTheme();
//
//         expect(window.matchMedia).toHaveBeenCalled();
//         expect(theme).toBe("dark");
//     });
//
//     it('returns theme from saved data', () => {
//         mockStorage.theme = 'light';
//
//         const theme = getDefaultTheme();
//
//         expect(getItemSpy).toHaveBeenCalled();
//         expect(theme).toBe('light');
//     });
//
//     it('returns lang from navigator', () => {
//         const lang = getDefaultLang();
//
//         expect(navigatorSpy).toHaveBeenCalled();
//         expect(lang).toBe('en');
//     });
//
//     it('returns lang from saved data', () => {
//         mockStorage.lang = 'pl';
//
//         const lang = getDefaultLang();
//
//         expect(getItemSpy).toHaveBeenCalled();
//         expect(lang).toBe('pl');
//     });
//
//     afterEach(() => {
//         getItemSpy.mockRestore();
//         navigatorSpy.mockRestore();
//         // I'm not sure how to clear this cleanly without pissing off TS, so this will do.
//         Object.defineProperty(window, 'matchMedia', {});
//         // doesn't matter anyway since vitest doesn't have a window.
//     })
// })