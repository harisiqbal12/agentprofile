import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

import CreateProperties from './CreateProperties';

function UpdateUserProperty(props) {
	return (
		<CreateProperties title={'Update Property'} data={props.route.params.data} />
	);
}

export default UpdateUserProperty;
