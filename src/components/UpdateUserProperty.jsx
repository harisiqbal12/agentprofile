import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

import CreateProperties from './CreateProperties';

function UpdateUserProperty(props) {
	const { data } = props.route.params;
	console.log(data);

	return <CreateProperties title={'Update Property'} data={data} />;
}

export default UpdateUserProperty;
