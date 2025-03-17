import React from 'react';
import { Share, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface ShareLinkButtonProps {
	url: string;
}

export const ShareLinkButton = ({ url }: ShareLinkButtonProps) => {
	const shareLink = async () => {
		try {
			const result = await Share.share({
				message: `Look at this Wikipedia page: ${url}`,
				url,
				title: 'Share Page',
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					console.log('Shared: ', result.activityType);
				} else {
					console.log('Link Shared');
				}
			} else if (result.action === Share.dismissedAction) {
				console.log('Share discarded');
			}
		} catch (error) {
			console.error('Error sharing:', error);
		}
	};

	return (
		<TouchableOpacity onPress={shareLink}>
			<FontAwesome name="share" size={24} color="black" />
		</TouchableOpacity>
	);
};
