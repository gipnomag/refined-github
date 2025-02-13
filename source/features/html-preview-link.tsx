import React from 'dom-chef';
import * as pageDetect from 'github-url-detection';

import features from '../feature-manager';
import observe from '../helpers/selector-observer';

const isSingleHTMLFile = (): boolean => pageDetect.isSingleFile() && /\.html?$/.test(location.pathname);

function add(rawButton: HTMLAnchorElement): void {
	rawButton
		.parentElement! // `BtnGroup`
		.prepend(
			<a
				className="btn btn-sm BtnGroup-item rgh-html-preview-link"
				// #3305
				href={`https://refined-github-html-preview.kidonng.workers.dev${rawButton.pathname}`}
			>
				Preview
			</a>,
		);
}

function init(signal: AbortSignal): void {
	observe('a#raw-url', add, {signal});
}

void features.add(import.meta.url, {
	asLongAs: [
		pageDetect.isPublicRepo,
	],
	include: [
		isSingleHTMLFile,
	],
	exclude: [
		pageDetect.isEnterprise,
	],
	init,
});
