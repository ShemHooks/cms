<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ScreenTimeLog extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'child_id',
        'screen_on_time',
        'recorded_at',
    ];

    /**
     * Get the child user this log belongs to.
     */
    public function child()
    {
        return $this->belongsTo(User::class, 'child_id');
    }
}
