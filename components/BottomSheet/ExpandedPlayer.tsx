import { View as ThemedView, StyleSheet, Image, Pressable, Dimensions, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useEffect, useState, useCallback } from 'react';
import { useAudio } from '@/contexts/AudioContext';
const { width } = Dimensions.get('window');
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

function shadeColor(color: string, percent: number): string {
    const R = parseInt(color.substring(1, 3), 16);
    const G = parseInt(color.substring(3, 5), 16);
    const B = parseInt(color.substring(5, 7), 16);

    let newR = Math.round((R * (100 + percent)) / 100);
    let newG = Math.round((G * (100 + percent)) / 100);
    let newB = Math.round((B * (100 + percent)) / 100);

    newR = newR < 255 ? newR : 255;
    newG = newG < 255 ? newG : 255;
    newB = newB < 255 ? newB : 255;

    const RR = ((newR.toString(16).length === 1) ? "0" + newR.toString(16) : newR.toString(16));
    const GG = ((newG.toString(16).length === 1) ? "0" + newG.toString(16) : newG.toString(16));
    const BB = ((newB.toString(16).length === 1) ? "0" + newB.toString(16) : newB.toString(16));

    return "#" + RR + GG + BB;
}

interface ExpandedPlayerProps {
    scrollComponent?: (props: any) => React.ReactElement;
}

export function ExpandedPlayer({ scrollComponent }: ExpandedPlayerProps) {
    const ScrollComponentToUse = scrollComponent || ScrollView;

    const {
        isPlaying,
        position,
        duration,
        togglePlayPause,
        sound,
        currentSong,
        playNextSong,
        playPreviousSong
    } = useAudio();
    const insets = useSafeAreaInsets();

    const colorToUse = currentSong?.artwork_bg_color || "#000000";
    const colors = [colorToUse, shadeColor(colorToUse, -50)];

    const handleSkipForward = async () => {
        if (sound) {
            await sound.setPositionAsync(Math.min(duration, position + 10000));
        }
    };

    const handleSkipBackward = async () => {
        if (sound) {
            await sound.setPositionAsync(Math.max(0, position - 10000));
        }
    };

    const formatTime = (millis: number) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
    };

    const progress = duration > 0 ? (position / duration) * 100 : 0;

    // Add sample lyrics (you should get this from your song data)
    const lyrics = [
        "Verse 1",
        "First line of the song",
        "Second line of the song",
        "Third line goes here",
        "",
        "Chorus",
        "This is the chorus",
        "Another chorus line",
        "Final chorus line",
        "",
        "Verse 2",
        "Back to the verses",
        "More lyrics here",
        "And here as well",
        // Add more lyrics as needed
    ];

    return (
        <LinearGradient
            colors={['#1f1f1f', '#1f1f1f']}
            style={[styles.rootContainer, { marginTop: insets.top }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >


            <ScrollComponentToUse
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >

            </ScrollComponentToUse>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        paddingTop: 30,

        backgroundColor: 'transparent',
        justifyContent: 'space-between',
    },


    artworkContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 12,
        backgroundColor: 'transparent', // Required for Android shadows
        marginBottom: 34,
    },
    artwork: {
        width: width - 52,
        height: width - 52,
        borderRadius: 8,
    },
    controls: {
        width: '100%',
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'space-between',
    },
    titleContainer: {
        // marginBottom: -30,
        backgroundColor: 'transparent',
        width: '100%',
        marginTop: 12
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    titleMain: {
        flex: 1,
    },
    titleIcons: {
        flexDirection: 'row',
        gap: 15,
    },
    title: {
        fontSize: 21,
        // marginBottom: 8,
        marginBottom: -4,
        color: '#fff',
    },
    artist: {
        fontSize: 19,
        opacity: 0.7,
        color: '#fff',
    },
    progressBar: {
        height: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 30,
    },
    progress: {
        width: '30%',
        height: '100%',
        backgroundColor: '#ffffff6a',
        borderRadius: 5,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: 'transparent',
    },
    timeText: {
        fontSize: 12,
        opacity: 0.6,
        color: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50,
        backgroundColor: 'transparent',
        marginTop: 10,
    },
    button: {
        padding: 10,
    },
    playButton: {
        transform: [{ scale: 1.2 }],
    },
    volumeControl: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 10,

    },
    volumeBar: {
        flex: 1,
        height: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 20,
    },
    volumeProgress: {
        width: '70%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    iconButton: {
        width: 32,
        height: 32,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    extraControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 26,
        backgroundColor: 'transparent',

    },
    extraControlButton: {
        alignItems: 'center',
        // justifyContent: 'center',
        opacity: 0.8,
        height: 60,
    },
    extraControlText: {
        color: '#fff',
        fontSize: 13,
        marginTop: 6,
        opacity: 0.7,
        fontWeight: '600',
    },
    extraControlIcons: {
        flexDirection: 'row',

    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    lyricsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        width: '100%',
        alignItems: 'center',
    },
    lyricsText: {
        color: '#fff',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        opacity: 0.8,
        marginVertical: 2,
    },
    lyricsSpacing: {
        marginVertical: 10,
    },
    dragHandleContainer: {
        paddingBottom: 14,
    },
});
