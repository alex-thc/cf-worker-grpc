import { createConnectTransport } from "@connectrpc/connect-web";
import { createClient } from "@connectrpc/connect";
import { MovieService } from "./gen/movie_pb";

function fetchProxy(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
	// Create a new init object without mode and credentials
	const newInit: RequestInit = { ...init };
	delete newInit.mode;
	delete newInit.credentials;
	newInit.redirect = "manual";

	// Call the original fetch with the modified init
	return fetch(input, newInit);
}

export function createMovieClient(env: Env) {
	const transport = createConnectTransport({
		baseUrl: env.DAPI_BASE_URL,
		fetch: fetchProxy,
		interceptors: [
			(next) => async (req) => {
				req.header.set("dapi-key", env.DAPI_API_KEY);
				req.header.set(
					"authorization",
					`Bearer ${env.DAPI_AUTH_TOKEN}`
				);
				return await next(req);
			},
		],
	});
	return createClient(MovieService, transport);
}