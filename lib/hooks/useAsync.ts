import { useReducer, useEffect } from 'react';

export interface IReduceState {
	loading: boolean;
	data: null | object;
	error: null | boolean | Error;
}

type IActionParams = { type: 'LOADING' } | { type: 'SUCCESS'; data: object } | { type: 'ERROR'; error: Error };

function reducer(state: IReduceState | undefined, action: IActionParams): IReduceState {
	switch (action.type) {
		case 'LOADING':
			return { loading: true, data: null, error: null };
		case 'SUCCESS':
			return { loading: false, data: action.data, error: null };
		case 'ERROR':
			return { loading: false, data: null, error: action.error };
		default:
			return { loading: false, data: null, error: new Error('Action type 이 누락된것 같습니다. ㅠㅠ') };
	}
}

function useAsync<T = IReduceState>(callback: () => Promise<T | any>, deps = []) {
	const [state, dispatch] = useReducer(reducer, {
		loading: false,
		data: null,
		error: false,
	});

	const fetchData = async () => {
		dispatch({ type: 'LOADING' });
		try {
			const data = await callback();
			dispatch({ type: 'SUCCESS', data });
		} catch (e) {
			dispatch({ type: 'ERROR', error: e });
		}
	};

	useEffect(() => {
		fetchData();
		// eslint 설정을 다음 줄에서만 비활성화
		// eslint-disable-next-line
    }, deps);

	return [state as IReduceState, fetchData];
}

export default useAsync;
