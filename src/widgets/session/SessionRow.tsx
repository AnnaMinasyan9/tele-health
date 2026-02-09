import type { Session } from "@shared/models";
import {
    colors,
    fontSizes,
    fontWeights,
    shadows,
    spacing,
    theme,
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
/**
 * Dumb presentational row for a single session.
 * Shows person avatar, name, location, address, duration, date & time.
 */
export function SessionRow({
    session
}: SessionRowProps) {
    const { date, time } = formatSessionDateTime(session.startAt ?? '');
    const isClinic = session.location === "clinic";
    const { patientName, doctorName } = session.sessionDetails;
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

            {/* Address (clinic sessions only) */}
            {isClinic && session.location && (
                <View style={styles.addressRow}>
                    <Text style={styles.addressIcon}>📍</Text>
                    <Text style={styles.addressText} numberOfLines={2}>
                        {session.location}
                    </Text>
                </View>
            )}

            {/* Date & time — "Feb 8, 2026 • 10:30 AM" */}
            <View style={styles.timeRow}>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
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
        color: colors.textPrimary,
    },
    meta: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
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
        color: colors.textSecondary,
        lineHeight: 18,
    },
    timeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: spacing.lg,
        paddingTop: spacing.mdl,
        borderTopWidth: 1,
        borderTopColor: colors.background,
    },
    date: {
        fontSize: fontSizes.base,
        fontWeight: fontWeights.medium,
        color: colors.textPrimary,
    },
    time: {
        fontSize: fontSizes.base,
        fontWeight: fontWeights.semibold,
        color: colors.primary,
    },
});
