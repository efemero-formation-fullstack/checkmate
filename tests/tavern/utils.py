from datetime import date, timedelta
import uuid


def fixed_valid_tournament():
    return {
        "name": "bigblue challenge 2026".format(uuid.uuid4()),
        "min_players": 8,
        "max_players": 16,
        "categories": ["senior", "veteran"],
        "end_registration_date": (date.today() + timedelta(days=9)).isoformat()
    }

def always_valid_tournament():
    return {
        "name": "bigblue challenge 2026 {}".format(uuid.uuid4()),
        "min_players": 8,
        "max_players": 16,
        "categories": ["senior", "veteran"],
        "end_registration_date": (date.today() + timedelta(days=9)).isoformat()
    }

def always_valid_tournament_full():
    return {
        "name": "bigblue challenge 2026 {}".format(uuid.uuid4()),
        "location": "Grand-Manil",
        "min_players": 8,
        "max_players": 16,
        "min_elo":600,
        "max_elo":1800,
        "categories": ["senior", "veteran"],
        "women_only": True,
        "end_registration_date": (date.today() + timedelta(days=9)).isoformat()
    }

def invalid_tournament_missing_name():
    return {
        "min_players": 8,
        "max_players": 16,
        "categories": ["senior", "veteran"],
        "end_registration_date": (date.today() + timedelta(days=9)).isoformat()
    }

def invalid_tournament_missing_max_players():
    return {
        "name": "bigblue challenge 2026 {}".format(uuid.uuid4()),
        "min_players": 8,
        "categories": ["senior", "veteran"],
        "end_registration_date": (date.today() + timedelta(days=9)).isoformat()
    }

def invalid_tournament_missing_min_players():
    return {
        "name": "bigblue challenge 2026 {}".format(uuid.uuid4()),
        "max_players": 8,
        "categories": ["senior", "veteran"],
        "end_registration_date": (date.today() + timedelta(days=9)).isoformat()
    }

def invalid_tournament_max_players_lt_min_players():
    return {
        "name": "bigblue challenge 2026 {}".format(uuid.uuid4()),
        "min_players": 8,
        "max_players": 7,
        "categories": ["senior", "veteran"],
        "end_registration_date": (date.today() + timedelta(days=9)).isoformat()
    }

def valid_tournament_max_players_eq_min_players():
    return {
        "name": "bigblue challenge 2026 {}".format(uuid.uuid4()),
        "min_players": 8,
        "max_players": 8,
        "categories": ["senior", "veteran"],
        "end_registration_date": (date.today() + timedelta(days=9)).isoformat()
    }

def invalid_tournament_missing_categories():
    return {
        "name": "bigblue challenge 2026 {}".format(uuid.uuid4()),
        "min_players": 8,
        "max_players": 16,
        "end_registration_date": (date.today() + timedelta(days=9)).isoformat()
    }

def invalid_tournament_missing_end_registration_date():
    return {
        "name": "bigblue challenge 2026 {}".format(uuid.uuid4()),
        "min_players": 8,
        "max_players": 16,
        "categories": ["senior", "veteran"],

    }

def invalid_tournament_bad_end_registration_date():
    return {
        "name": "bigblue challenge 2026 {}".format(uuid.uuid4()),
        "min_players": 8,
        "max_players": 16,
        "categories": ["senior", "veteran"],
        "end_registration_date": (date.today() + timedelta(days=8)).isoformat()
    }

def invalid_tournament_max_elo_lt_min_elo():
    return {
        "name": "bigblue challenge 2026 {}".format(uuid.uuid4()),
        "min_players": 8,
        "max_players": 16,
        "min_elo":600,
        "max_elo":400,
        "categories": ["senior", "veteran"],
        "end_registration_date": (date.today() + timedelta(days=9)).isoformat()
    }

def valid_tournament_max_elo_eq_min_elo():
    return {
        "name": "bigblue challenge 2026 {}".format(uuid.uuid4()),
        "min_players": 8,
        "max_players": 16,
        "min_elo":600,
        "max_elo":600,
        "categories": ["senior", "veteran"],
        "end_registration_date": (date.today() + timedelta(days=9)).isoformat()
    }
