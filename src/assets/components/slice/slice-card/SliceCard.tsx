import {AspectRatio, Card, Group, Image, LoadingOverlay, rem, Text} from '@mantine/core';
import classes from './SliceCard.module.css';
import { DropDownMenu } from '../../parts/drop-down-menu/DropDownMenu';
import { AssetCardProps } from '../../AssetCardProps';
import { SettingsContext } from '@/core/utils/settingsContext';
import { useCallback, useContext, useState } from 'react';

export function SliceCard({projectUuid, asset, selected, onSelectChange, onDelete}: AssetCardProps) {
    const {local_backend} = useContext(SettingsContext);
    const [loading, setLoading] = useState(false);
    const toggleLoadingCallback = useCallback(() => {
        setLoading((l)=>{
            return !l
        })
    },[loading])

    const size = rem('280px');
    return (
        <Card withBorder padding="lg" radius="md" className={classes.card} style={{minWidth: size, width: size, borderColor: selected?'red':''}}>
            <Card.Section mb="sm" onClick={()=>onSelectChange(true)}>
                <AspectRatio ratio={16 / 9}>

                    <Image
                        src={`${local_backend}/projects/${projectUuid}/assets/${asset?.slice?.image.sha1}`}
                        alt={asset.name}
                    />
                </AspectRatio>
            </Card.Section>

            <Text fw={700} className={classes.title} mt="xs" onClick={()=>onSelectChange(true)}>
                {asset.name}
            </Text>

            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ blur: 2 }} />
            <Card.Section className={classes.footer}>
                <Group justify="flex-end">
                    <Group gap={0}>
                        <DropDownMenu
                            projectUuid={projectUuid}
                            sha1={asset.sha1}
                                openDetails={()=>onSelectChange(true)}
                                downloadURL={`${local_backend}/projects/${projectUuid}/assets/${asset?.sha1}?download=true'`}
                                onDelete={() => onDelete(projectUuid, asset.sha1)}
                                toggleLoad={toggleLoadingCallback}>
                            </DropDownMenu>
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    );
}