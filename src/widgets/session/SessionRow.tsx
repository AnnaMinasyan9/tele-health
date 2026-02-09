import type { Session } from "@shared/models";
import {
    fontSizes,
    fontWeights,
    shadows,
    spacing,
    theme,
    useStyles,
    type AppTheme,
} from "@shared/theme";
import { Avatar } from "@shared/ui";
import { StyleSheet, Text, View } from "react-native";

interface SessionRowProps {
    session: Session;
}

function formatSessionDateTime(iso: string): { date: string; time: string } {
    const d = new Date(iso);

    if (isNaN(d.getTime())) {
        return { date: "Invalid date", time: "--:--" };
    }

    const date = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const time = d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    return { date, time };
}

export function SessionRow({
    session
}: SessionRowProps) {
    const { date, time } = formatSessionDateTime(session.startAt ?? '');
    const isClinic = session.location === "clinic";
    const { patientName, doctorName } = session.sessionDetails;
    const styles = useStyles(createStyles);

    return (
        <View style={styles.card}>
            {/* Person + meta row */}
            <View style={styles.personRow}>
                <Avatar name={patientName} size={40} />
                <View style={styles.personInfo}>
                    <Text style={styles.personName}>{patientName}</Text>
                    <Text style={styles.meta}>
                        {isClinic ? "🏥 Clinic" : "🌐 Online"}
                        {"  ·  "}
                        {session.durationMinutes} min
                    </Text>
                </View>
            </View>

            {isClinic && session.location && (
                <View style={styles.addressRow}>
                    <Text style={styles.addressIcon}>📍</Text>
                    <Text style={styles.addressText} numberOfLines={2}>
                        {session.location}
                    </Text>
                </View>
            )}

            <View style={styles.timeRow}>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>
        </View>
    );
}

function createStyles(t: AppTheme) {
    return StyleSheet.create({
        card: {
            backgroundColor: t.colors.surface,
            borderRadius: theme.radii.xl,
            padding: spacing.xxl,
            marginBottom: spacing.mdl,
            ...shadows.card,
        },
        personRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.lg,
        },
        personInfo: { flex: 1 },
        personName: {
            fontSize: fontSizes.body,
            fontWeight: fontWeights.semibold,
            color: t.colors.textPrimary,
        },
        meta: {
            fontSize: fontSizes.md,
            color: t.colors.textSecondary,
            marginTop: spacing.xxs,
        },
        addressRow: {
            flexDirection: "row",
            alignItems: "flex-start",
            marginTop: spacing.md,
            paddingLeft: spacing.xxs,
            gap: spacing.sm,
        },
        addressIcon: {
            fontSize: fontSizes.base,
        },
        addressText: {
            flex: 1,
            fontSize: fontSizes.md,
            color: t.colors.textSecondary,
            lineHeight: 18,
        },
        timeRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: spacing.lg,
            paddingTop: spacing.mdl,
            borderTopWidth: 1,
            borderTopColor: t.colors.background,
        },
        date: {
            fontSize: fontSizes.base,
            fontWeight: fontWeights.medium,
            color: t.colors.textPrimary,
        },
        time: {
            fontSize: fontSizes.base,
            fontWeight: fontWeights.semibold,
            color: t.colors.primary,
        },
    });
}
